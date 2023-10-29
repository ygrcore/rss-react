import { useState, useEffect } from 'react';
import PokeApi from '../../services/PokeApi';

const pokemon = new PokeApi();

function PokeSearchForm() {
  const items = localStorage.getItem('searchedPokes');
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('term') || '');
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>(items ? JSON.parse(items) : []);
  const [error, setError] = useState('');


  useEffect(() => {
    // if (localStorage.getItem('searchedPokes')) {
    //   return;
    // } else {
      getPokemons();
    // }
  }, []);

  const getPokemons = async () => {
    const response = await pokemon.getPokemonsNames();
    setPokemons(response);
    localStorage.setItem('response', JSON.stringify(response));
  }

  const handleSearch = async () => {
    searchForPokes();
  };

  const searchForPokes = () => {
    try {
      const searchTermRegex = new RegExp(searchTerm, 'i');
      localStorage.setItem('term', searchTerm)
      const searchResults = pokemons.filter((pokemon) => searchTermRegex.test(pokemon));
      setSearchResults(searchResults);
      localStorage.setItem('searchedPokes', JSON.stringify(searchResults));
      setError('');
    } catch (err) {
      setSearchResults([]);
      setError('No results found or an error occurred.');
    }
  }

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a Pokémon"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {searchResults.length ? searchResults.map((pokemon) => (
          <li key={pokemon}>
            {pokemon}
          </li>
        )) : pokemons.map((pokemon) => (
          <li key={pokemon}>
            {pokemon}
          </li>))}
      </ul>
    </div>
  );
}

export default PokeSearchForm;

