import React, { useState, useEffect } from 'react';
import PokeApi from '../../services/PokeApi';
import { PokemonData } from '../../types/types';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';

const Pokedex: React.FC = () => {
  const { getAllPokemons } = PokeApi();
  const items = localStorage.getItem('searchedPokes');
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [searchResults, setSearchResults] = useState<PokemonData[]>(
    items ? JSON.parse(items) : []
  );
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('term') || '');

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
    const filteredResults = pokemonList.filter((pokemon) =>
      searchTermRegex.test(pokemon.name) || term === String(pokemon.id)
    );
    setSearchResults(filteredResults);
    localStorage.setItem('searchedPokes', JSON.stringify(filteredResults));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <PokemonList searchResults={searchResults} />
    </div>
  );
};

export default Pokedex;
