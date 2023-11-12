import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { PokemonResult } from '../../types/types';
import PokeApi from '../../services/PokeApi';

type PokedexContextType = {
  pokemonList: PokemonResult[];
  searchTerm: string;
  itemsPerPage: number;
  updatePokemonList: (pokemonList: PokemonResult[]) => void;
  updateSearchTerm: (term: string) => void;
  updateItemsPerPage: (term: number) => void;
};

export const PokedexContext = createContext<PokedexContextType | undefined>(
  undefined
);

export const PokedexProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pokemonList, setPokemonList] = useState<PokemonResult[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('term') || ''
  );
  const { getPreloadedPokemons } = PokeApi();

  useEffect(() => {
    fetchPokemon();
  }, [itemsPerPage]);

  const fetchPokemon = async () => {
    const pokemonData = await getPreloadedPokemons(150, 0);
    setPokemonList(pokemonData);
  };

  const updatePokemonList = (newPokemonList: PokemonResult[]) => {
    setPokemonList(newPokemonList);
  };

  const updateSearchTerm = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const updateItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  return (
    <PokedexContext.Provider
      value={{
        pokemonList,
        searchTerm,
        itemsPerPage,
        updatePokemonList,
        updateSearchTerm,
        updateItemsPerPage,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
