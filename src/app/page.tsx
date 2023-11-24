'use client';
// import App from '../App';
// import Pokedex from '../components/PokeSearchForm/Pokedex';
import { useEffect } from 'react';
// import SearchBar from '../components/PokeSearchForm/SearchBar/SearchBar';
import { useAppDispatch } from '../hooks/redux';
import {
  // updateSearchResults,
  // updateSearchTerm,
  // updateItemsPerPage,
  // updateCurrentPage,
  updatePokemonList,
} from '../store/reducers/pokedexSlice';
import { PokeApi } from '../services/PokeApi';
import Pokedex from './pokedex';

export default function Home() {
  // const { pokemonList, searchResults, itemsPerPage, currentPage } =
  //   useAppSelector((state) => state.pokedexReducer);
  const dispatch = useAppDispatch();
  const { data } = PokeApi.useGetPreloadedPokemonsQuery({
    limit: 150,
    offset: 0,
  });

  useEffect(() => {
    if (data) dispatch(updatePokemonList(data));
  }, [data]);

  // const handleSearch = (term: string) => {
  //   dispatch(updateSearchTerm(term));
  //   const searchTermRegex = new RegExp(term, 'i');
  //   localStorage.setItem('term', term);
  //   const filteredResults = pokemonList.filter((pokemon) =>
  //     searchTermRegex.test(pokemon.name)
  //   );
  //   dispatch(updateSearchResults(filteredResults));
  //   localStorage.setItem('currentPage', '1');
  //   dispatch(updateCurrentPage(1));
  //   localStorage.setItem('searchedPokes', JSON.stringify(filteredResults));
  // };

  return (
    <div>
      <h1>Main Page</h1>
      <Pokedex />
      {/* <Pokedex/> */}
      {/* <App/> */}
      {/* <SearchBar onSearch={handleSearch} /> */}
    </div>
  );
}
