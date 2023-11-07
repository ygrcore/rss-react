import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PokeApi from '../../services/PokeApi';
import { PokemonResult } from '../../types/types';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import Pagination from '../Pagination/Pagination';

import './Pokedex.css';

const Pokedex: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { getPreloadedPokemons } = PokeApi();
  const items = localStorage.getItem('searchedPokes');
  const currPage = localStorage.getItem('currentPage');
  const [pokemonList, setPokemonList] = useState<PokemonResult[]>([]);
  const [searchResults, setSearchResults] = useState<PokemonResult[]>(
    items ? JSON.parse(items) : []
  );
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('term') || ''
  );
  const [currentPage, setCurrentPage] = useState(currPage ? +currPage : 1);

  useEffect(() => {
    fetchPokemon();
  }, [itemsPerPage]);

  const fetchPokemon = async () => {
    const pokemonData = await getPreloadedPokemons(150, 0);
    setPokemonList(pokemonData);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
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
    setItemsPerPage(newItemsPerPage);
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <Pagination
        totalPages={Math.ceil(
          (searchResults.length ? searchResults.length : pokemonList.length) /
            itemsPerPage
        )}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className="select-amount">
        <p className="select-title">Amount of pokemons</p>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <PokemonList
              pokemonList={pokemonList}
              searchResults={searchResults}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
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
