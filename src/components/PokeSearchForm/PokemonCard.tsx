import { Link } from 'react-router-dom';
import { PokemonData } from '../../types/types';
import { getColorForType } from '../../utils/additional/colorsForTypes';

type PokemonCardProps = {
  pokemon: PokemonData;
  currentPage: number;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, currentPage }) => {
  return (
    <Link to={`${pokemon.name}?page=${currentPage}`}>
      <li
        className="card"
        style={{
          backgroundColor: pokemon.type
            ? getColorForType(pokemon.type)
            : 'gray',
        }}
      >
        <img className="card-image" src={pokemon.image} alt={pokemon.name} />
        <h2 className="card-title">{pokemon.name}</h2>
        <p className="card-subtitle">Type: {pokemon.type}</p>
      </li>
    </Link>
  );
};

export default PokemonCard;
