import { PokemonResult } from "../../types/types";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface pokedexState {
  pokemonList: PokemonResult[];
  searchResults: PokemonResult[];
  searchTerm: string;
  itemsPerPage: number;
  currentPage: number;
  isLoading: boolean;
  error: string;
}
const storedSearchResults = localStorage.getItem('searchedPokes');
const initialSearchResults = storedSearchResults ? JSON.parse(storedSearchResults) : [];
const currPage = localStorage.getItem('currentPage');
const initialCurrPage = currPage ? localStorage.getItem('term') : '';

const initialState: pokedexState = {
  pokemonList: [],
  searchResults: initialSearchResults,
  searchTerm: localStorage.getItem('term') || '',
  itemsPerPage: 10,
  currentPage: initialCurrPage ? +initialCurrPage : 1,
  isLoading: false,
  error: '',
}

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
  }
});

export const {
  updatePokemonList,
  updateSearchResults,
  updateSearchTerm,
  updateItemsPerPage,
  updateCurrentPage,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;