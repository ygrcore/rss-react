import React, { useState, useEffect } from 'react';
import PokeApi from '../../services/PokeApi';
import { PokemonData } from '../../types/types';

const PokeSearchForm: React.FC = () => {
  const { getAllPokemons } = PokeApi();
  const items = localStorage.getItem('searchedPokes');
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [searchResults, setSearchResults] = useState<PokemonData[]>(
    items ? JSON.parse(items) : []
  );
  const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('term') || '');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const pokemonData = await getAllPokemons(150, 0);
    setPokemonList(pokemonData);
  };

  const handleSearch = () => {
    searchForPokes();
  };

  const searchForPokes = () => {
    try {
      const searchTermRegex = new RegExp(searchTerm, 'i');
      localStorage.setItem('term', searchTerm);
      const searchResults = pokemonList.filter((pokemon) =>
        searchTermRegex.test(pokemon.name) || searchTerm === String(pokemon.id)
      );
      setSearchResults(searchResults);
      localStorage.setItem('searchedPokes', JSON.stringify(searchResults));
      setError('');
    } catch (err) {
      setSearchResults([]);
      setError('No results found or an error occurred.');
      throw new Error(`${err}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        id="searchbar"
        placeholder="Search for a Pokémon"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchForPokes();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul id="pokedex">
        {searchResults.map((pokemon) => (
          <li
            key={pokemon.id}
            className="card"
            style={{ padding: '2%', margin: '2%', listStyleType: 'none' }}
          >
            <img
              className="card-image"
              src={pokemon.image}
              alt={pokemon.name}
            />
            <h2 className="card-title">{pokemon.name}</h2>
            <p className="card-subtitle">Type: {pokemon.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokeSearchForm;

