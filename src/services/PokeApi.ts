export interface PokemonData {
  name: string;
  image?: string;
  // add more
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonResponse {
  name: string;
  sprites: {
    front_default: string;
    // add more
  };
  // add more
}

export interface PokemonResource {
  count?: number;
  next?: string;
  previous?: string;
  results: PokemonResult | PokemonResult[];
}

const PokeApi = () => {
  const apiBase = 'https://pokeapi.co/api/v2/';
  const baseLimit = 10;
  const baseOffset = 10;

  const getResource = async <T>(url: string): Promise<T> => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  const getAllPokemons = async (
    limit = baseLimit,
    offset = baseOffset
  ): Promise<PokemonData[]> => {
    const res = await getResource<PokemonResource>(
      `${apiBase}pokemon?limit=${limit}&offset=${offset}`
    );
    const results = res.results;
    if (Array.isArray(results)) {
      const pokemonData = await Promise.all(
        results.map(async (result) => {
          const pokemonResponse = await fetch(result.url);
          const pokemon = await pokemonResponse.json();
          return transformData(pokemon);
        })
      );
      return pokemonData;
    } else {
      throw new Error();
    }
  };

  const getPokemonsNames = async (): Promise<string[]> => {
    const res = await getResource<PokemonResource>(
      `${apiBase}pokemon?limit=100000&offset=0`
    );
    const results = res.results;
    if (Array.isArray(results)) {
      const names = results.map((poke) => poke.name);
      return names;
    }
    return [];
  };

  const getPokemon = async (id: string): Promise<PokemonData> => {
    const res = await getResource<PokemonResponse>(`${apiBase}pokemon/${id}`);
    return transformData(res);
  };

  const transformData = (pokemon: PokemonResponse) => {
    return {
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    };
  };

  return {
    getAllPokemons,
    getPokemonsNames,
    getPokemon,
  };
};

export default PokeApi;
