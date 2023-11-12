import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { usePokedex } from '../PokedexContext/usePokedex';
import { PokemonResult } from '../../types/types';
import ForceError from '../forceError/ForceError';
import SearchBar from './SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';
import PokemonPerPageSelect from './PokemonPerPageSelect/PokemonPerPageSelect';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

import './Pokedex.css';

const Pokedex: React.FC = () => {
  const { pokemonList, itemsPerPage, updateSearchTerm, updateItemsPerPage } =
    usePokedex();
  const items = localStorage.getItem('searchedPokes');
  const currPage = localStorage.getItem('currentPage');
  const [searchResults, setSearchResults] = useState<PokemonResult[]>(
    items ? JSON.parse(items) : []
  );
  const [currentPage, setCurrentPage] = useState(currPage ? +currPage : 1);

  const handleSearch = (term: string) => {
    updateSearchTerm(term);
    const searchTermRegex = new RegExp(term, 'i');
    localStorage.setItem('term', term);
    const filteredResults = pokemonList.filter((pokemon) =>
      searchTermRegex.test(pokemon.name)
    );
    setSearchResults(filteredResults);
    localStorage.setItem('currentPage', '1');
    setCurrentPage(1);
    localStorage.setItem('searchedPokes', JSON.stringify(filteredResults));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page.toString());
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    updateItemsPerPage(newItemsPerPage);
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
        searchResults={searchResults}
      />
      <PokemonPerPageSelect onChange={handleItemsPerPageChange} />
      <Routes>
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
      </Routes>
    </div>
  );
};

export default Pokedex;
