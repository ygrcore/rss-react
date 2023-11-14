import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { usePokedex } from '../PokedexContext/usePokedex';
import ForceError from '../forceError/ForceError';
import SearchBar from './SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';
import PokemonPerPageSelect from './PokemonPerPageSelect/PokemonPerPageSelect';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

import './Pokedex.css';

const Pokedex: React.FC = () => {
  const {
    pokemonList,
    searchResults,
    itemsPerPage,
    currentPage,
    updateSearchResults,
    updateSearchTerm,
    updateItemsPerPage,
    updateCurrentPage,
  } = usePokedex();

  const handleSearch = (term: string) => {
    updateSearchTerm(term);
    const searchTermRegex = new RegExp(term, 'i');
    localStorage.setItem('term', term);
    const filteredResults = pokemonList.filter((pokemon) =>
      searchTermRegex.test(pokemon.name)
    );
    updateSearchResults(filteredResults);
    localStorage.setItem('currentPage', '1');
    updateCurrentPage(1);
    localStorage.setItem('searchedPokes', JSON.stringify(filteredResults));
  };

  const handlePageChange = (page: number) => {
    updateCurrentPage(page);
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
