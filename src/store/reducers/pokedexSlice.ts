'use client';

import { PokemonResult } from '../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface pokedexState {
  pokemonList: PokemonResult[];
  searchResults: PokemonResult[];
  searchTerm: string;
  itemsPerPage: number;
  currentPage: number;
  isLoading: boolean;
  error: string;
}

let storedSearchResults;
let currPage;
let initTerm;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  // const item = localStorage.getItem('key')
  storedSearchResults = localStorage.getItem('searchedPokes');
  currPage = localStorage.getItem('currentPage');
  initTerm = localStorage.getItem('term');
}
const initialSearchResults = storedSearchResults
  ? JSON.parse(storedSearchResults)
  : [];
// const currPage = localStorage.getItem('currentPage');
const initialCurrPage = currPage ? initTerm : '';

const initialState: pokedexState = {
  pokemonList: [],
  searchResults: initialSearchResults,
  searchTerm: initTerm || '',
  itemsPerPage: 10,
  currentPage: initialCurrPage ? +initialCurrPage : 1,
  isLoading: false,
  error: '',
};

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    updatePokemonList: (state, action: PayloadAction<PokemonResult[]>) => {
      state.pokemonList = action.payload;
    },
    updateSearchResults: (state, action: PayloadAction<PokemonResult[]>) => {
      state.searchResults = action.payload;
    },
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  updatePokemonList,
  updateSearchResults,
  updateSearchTerm,
  updateItemsPerPage,
  updateCurrentPage,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;
