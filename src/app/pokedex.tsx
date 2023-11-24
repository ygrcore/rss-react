'use client';
import React, { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import ForceError from '../components/forceError/ForceError';
import SearchBar from '../components/PokeSearchForm/SearchBar/SearchBar';
import Pagination from '../components/Pagination/Pagination';
import PokemonPerPageSelect from '../components/PokeSearchForm/PokemonPerPageSelect/PokemonPerPageSelect';
import PokemonList from '../components/PokeSearchForm/PokemonList/PokemonList';
import PokemonDetails from '../components/PokemonDetails/PokemonDetails';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import {
  updateSearchResults,
  updateSearchTerm,
  updateItemsPerPage,
  updateCurrentPage,
  updatePokemonList,
} from '../store/reducers/pokedexSlice';
import { PokeApi } from '../services/PokeApi';

// import './Pokedex.css';

const Pokedex: React.FC = () => {
  const { pokemonList, searchResults, itemsPerPage, currentPage } =
    useAppSelector((state) => state.pokedexReducer);
  const dispatch = useAppDispatch();

  const { data } = PokeApi.useGetPreloadedPokemonsQuery({
    limit: 150,
    offset: 0,
  });

  useEffect(() => {
    if (data) dispatch(updatePokemonList(data));
  }, [data]);

  const handleSearch = (term: string) => {
    dispatch(updateSearchTerm(term));
    const searchTermRegex = new RegExp(term, 'i');
    localStorage.setItem('term', term);
    const filteredResults = pokemonList.filter((pokemon) =>
      searchTermRegex.test(pokemon.name)
    );
    dispatch(updateSearchResults(filteredResults));
    localStorage.setItem('currentPage', '1');
    dispatch(updateCurrentPage(1));
    localStorage.setItem('searchedPokes', JSON.stringify(filteredResults));
  };

  const handlePageChange = (page: number) => {
    dispatch(updateCurrentPage(page));
    localStorage.setItem('currentPage', page.toString());
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    dispatch(updateItemsPerPage(newItemsPerPage));
  };

  return (
    <div>
      <ForceError />
      <SearchBar onSearch={handleSearch} />
      <Pagination
        totalPages={Math.ceil(
          (searchResults.length ? searchResults.length : pokemonList.length) /
            itemsPerPage
        )}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <PokemonPerPageSelect onChange={handleItemsPerPageChange} />
      <PokemonList searchResults={searchResults} currentPage={currentPage} />
      {/* <Routes>
        <Route
          path="/"
          element={
            <PokemonList
              searchResults={searchResults}
              currentPage={currentPage}
            />
          }
        >
          <Route path=":pokemonName" element={<PokemonDetails />} />
        </Route>
      </Routes> */}
      <PokemonDetails />
    </div>
  );
};

export default Pokedex;
