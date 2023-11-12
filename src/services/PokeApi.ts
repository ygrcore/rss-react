import {
  PokemonData,
  PokemonResource,
  PokemonResponse,
  PokemonResult,
} from '../types/types';
import { getResource } from '../utils/getResource';

const PokeApi = () => {
  const apiBase = 'https://pokeapi.co/api/v2/';
  const baseLimit = 10;
  const baseOffset = 10;

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
    getPokemon,
    getPreloadedPokemons,
    getUrlsFromPreloadedPokes,
  };
};

export default PokeApi;
