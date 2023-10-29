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

class PokeApi {
  _apiBase = 'https://pokeapi.co/api/v2/';
  _baseLimit = 10;
  _baseOffset = 10;

  getResource = async <T>(url: string): Promise<T> => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllPokemons = async (
    limit = this._baseLimit,
    offset = this._baseOffset
  ): Promise<PokemonData[]> => {
    const res = await this.getResource<PokemonResource>(
      `${this._apiBase}pokemon?limit=${limit}&offset=${offset}`
    );
    // return res.results.map(this._transformData);
    const results = res.results;
    if (Array.isArray(results)) {
      const pokemonData = await Promise.all(
        results.map(async (result: PokemonResult) => {
          const pokemonResponse = await fetch(result.url);
          const pokemon: PokemonResponse = await pokemonResponse.json();
          // console.log(pokemon);
          return this._transformData(pokemon);
        })
      );
      return pokemonData;
    } else {
      throw new Error();
    }
  };

  getPokemon = async (id: number | string): Promise<PokemonData> => {
    const res = await this.getResource<PokemonResponse>(
      `${this._apiBase}pokemon/${id}`
    );
    return this._transformData(res);
  };

  _transformData = (pokemon: PokemonResponse): PokemonData => {
    return {
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    };
  };
}

export default PokeApi;
