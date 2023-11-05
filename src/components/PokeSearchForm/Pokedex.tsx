import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PokeApi from '../../services/PokeApi';
import { PokemonData } from '../../types/types';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import Pagination from '../Pagination/Pagination';

import './Pokedex.css';

const Pokedex: React.FC = () => {
  const itemsPerPage = 10;
  const { getAllPokemons } = PokeApi();
  const items = localStorage.getItem('searchedPokes');
  const currPage = localStorage.getItem('currentPage');
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [searchResults, setSearchResults] = useState<PokemonData[]>(
    items ? JSON.parse(items) : []
  );
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('term') || ''
  );
  const [currentPage, setCurrentPage] = useState(currPage ? +currPage : 1);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const pokemonData = await getAllPokemons(150, 0);
    setPokemonList(pokemonData);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const searchTermRegex = new RegExp(term, 'i');
    localStorage.setItem('term', term);
    const filteredResults = pokemonList.filter(
      (pokemon) =>
        searchTermRegex.test(pokemon.name) || term === String(pokemon.id)
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

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Pagination
        totalPages={Math.ceil(searchResults.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PokemonList
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
