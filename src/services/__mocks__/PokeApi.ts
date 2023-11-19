import { PokemonData, PokemonResult } from '../../types/types';

export const pokemons: PokemonResult[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
];

export const pokemonsDetails: PokemonData[] = [
  {
    name: 'bulbasaur',
    image: 'bulbasaur.png',
    type: 'grass',
    id: '1',
  },
];

export const singlePokemon: PokemonData = {
  name: 'bulbasaur',
  image: 'bulbasaur.png',
  type: 'grass',
  id: '1',
};

const PokeApi = () => {
  const getPreloadedPokemons = async (): Promise<PokemonResult[]> => {
    return new Promise((resolve) => {
      console.log('Called mocked getPreloadedPokemons');
      process.nextTick(() => resolve(pokemons));
    });
  };

  const getUrlsFromPreloadedPokes = async (): Promise<PokemonData[]> => {
    return new Promise((resolve) => {
      console.log('Called mocked getUrlsFromPreloadedPokes');
      process.nextTick(() => resolve(pokemonsDetails));
    });
  };

  const getPokemon = async () => {
    return new Promise((resolve) => {
      console.log('Called mocked getPokemon');
      process.nextTick(() =>
        resolve({
          data: {
            name: 'Bulbasaur',
            id: 1,
            image: 'bulbasaur.png',
            type: 'Grass/Poison',
          },
          isFetching: false,
          isLoading: false,
        })
      );
    });
  };

  return {
    getPokemon,
    getPreloadedPokemons,
    getUrlsFromPreloadedPokes,
  };
};

export default PokeApi;
