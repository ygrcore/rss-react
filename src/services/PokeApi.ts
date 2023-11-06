import {
  PokemonData,
  PokemonResource,
  PokemonResponse,
  PokemonResult,
} from '../types/types';

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

  const getPreloadedPokemons = async (
    limit = baseLimit,
    offset = baseOffset
  ): Promise<PokemonResult[]> => {
    const res = await getResource<PokemonResource>(
      `${apiBase}pokemon?limit=${limit}&offset=${offset}`
    );
    const results = res.results;
    return Array.isArray(results) ? results : [results];
  };

  const getUrlsFromPreloadedPokes = async (
    result: PokemonResult[]
  ): Promise<PokemonData[]> => {
    if (Array.isArray(result)) {
      const pokemonData = await Promise.all(
        result.map(async (result) => {
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
    const types = pokemon.types?.map((type) => type.type.name).join(', ');
    return {
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      type: types,
      id: pokemon.id,
    };
  };

  return {
    getAllPokemons,
    getPokemonsNames,
    getPokemon,
    getPreloadedPokemons,
    getUrlsFromPreloadedPokes,
  };
};

export default PokeApi;
