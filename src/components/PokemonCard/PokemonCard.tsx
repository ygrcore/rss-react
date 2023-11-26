import Link from 'next/link';
import { PokemonData } from '../../types/types';
import { getColorForType } from '../../utils/additional/colorsForTypes';
import styles from './PokemonCard.module.css';

type PokemonCardProps = {
  pokemon: PokemonData;
  currentPage: number;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, currentPage }) => {
  return (
    <Link
      data-testid="pokemon-card"
      href={`?page=${currentPage}/${pokemon.name}`}
    >
      <li
        key={pokemon.name}
        className={styles.card}
        style={{
          backgroundColor: pokemon.type
            ? getColorForType(pokemon.type)
            : 'gray',
        }}
      >
        <img
          className={styles.cardImage}
          src={pokemon.image}
          alt={pokemon.name}
        />
        <h2 className={styles.cardTitle}>{pokemon.name}</h2>
        <p className={styles.cardSubtitle}>Type: {pokemon.type}</p>
      </li>
    </Link>
  );
};

export default PokemonCard;
