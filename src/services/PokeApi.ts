import {
  PokemonData,
  PokemonResponse,
  PokemonResult,
} from '../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const PokeApi = createApi({
  reducerPath: 'PokeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPreloadedPokemons: build.query<
      PokemonResult[],
      { limit: number; offset: number }
    >({
      queryFn: async (args) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${args.limit}&offset=${args.offset}`
        );
        if (res.ok) {
          const data = await res.json();
          const results = await data.results;
          return { data: Array.isArray(results) ? results : [results] };
        }
        throw new Error('Failed to fetch data');
      },
    }),
    getUrlsFromPreloadedPokes: build.query<PokemonData[], PokemonResult[]>({
      queryFn: async (result) => {
        if (Array.isArray(result)) {
          const pokemonData = await Promise.all(
            result.map(async (pokemonResult) => {
              const pokemonResponse = await fetch(pokemonResult.url);
              const pokemon = await pokemonResponse.json();
              return transformData(pokemon);
            })
          );
          return { data: pokemonData };
        } else {
          throw new Error('Invalid argument type');
        }
      },
    }),
    getPokemon: build.query<PokemonData, string>({
      queryFn: async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const response = await res.json();
        return { data: transformData(response) };
      },
    }),
  }),
});

const transformData = (pokemon: PokemonResponse) => {
  const types = pokemon.types?.map((type) => type.type.name).join(', ');
  return {
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    type: types,
    id: pokemon.id,
  };
};
