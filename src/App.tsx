import { useEffect, useState } from 'react';
import PokeApi from './services/PokeApi';
import PokeSearchForm from './components/PokeSearchForm/PokeSearchForm';

interface PokemonData {
  name: string;
  image?: string;
  // add more
}

const pokemon = new PokeApi();

const getData = async () => {
  const data = await pokemon.getAllPokemons();
  console.log('Here is some data', data);
};

getData();

function App() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  useEffect(() => {
    async function fetchPokemons() {
      const pokemonList = await pokemon.getAllPokemons();
      if (pokemonList) setPokemons(pokemonList);
    }
    fetchPokemons();
  }, []);

  return (
    <div>
      <PokeSearchForm />
      <h1>List of 10 Pokemons</h1>
      <div className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            {/* add more info */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
