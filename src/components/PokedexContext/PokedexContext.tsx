import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { PokemonResult } from '../../types/types';
import PokeApi from '../../services/PokeApi';

type PokedexContextType = {
  pokemonList: PokemonResult[];
  searchResults: PokemonResult[];
  searchTerm: string;
  itemsPerPage: number;
  currentPage: number;
  updatePokemonList: (pokemonList: PokemonResult[]) => void;
  updateSearchResults: (pokemonList: PokemonResult[]) => void;
  updateSearchTerm: (term: string) => void;
  updateItemsPerPage: (term: number) => void;
  updateCurrentPage: (page: number) => void;
};

export const PokedexContext = createContext<PokedexContextType | undefined>(
  undefined
);

export const PokedexProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pokemonList, setPokemonList] = useState<PokemonResult[]>([]);
  const items = localStorage.getItem('searchedPokes');
  const [searchResults, setSearchResults] = useState<PokemonResult[]>(
    items ? JSON.parse(items) : []
  );
  const currPage = localStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState(currPage ? +currPage : 1);
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

  const updateSearchResults = (newSearchResults: PokemonResult[]) => {
    setSearchResults(newSearchResults);
  };

  const updateCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <PokedexContext.Provider
      value={{
        pokemonList,
        searchResults,
        searchTerm,
        itemsPerPage,
        currentPage,
        updatePokemonList,
        updateSearchResults,
        updateSearchTerm,
        updateItemsPerPage,
        updateCurrentPage,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};
