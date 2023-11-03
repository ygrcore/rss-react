import { PokemonData } from '../../types/types';

const PokemonList = ({ searchResults }: { searchResults: PokemonData[] }) => (
  <ul id="pokedex">
    {searchResults.map((pokemon) => (
      <li
        key={pokemon.id}
        className="card"
        style={{ padding: '2%', margin: '2%', listStyleType: 'none' }}
      >
        <img className="card-image" src={pokemon.image} alt={pokemon.name} />
        <h2 className="card-title">{pokemon.name}</h2>
        <p className="card-subtitle">Type: {pokemon.type}</p>
      </li>
    ))}
  </ul>
);

export default PokemonList;
