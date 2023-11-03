import React from 'react';
import { PokemonData } from '../../types/types';

type PokemonListProps = {
  searchResults: PokemonData[];
  currentPage: number;
  itemsPerPage: number;
};

const PokemonList: React.FC<PokemonListProps> = ({
  searchResults,
  currentPage,
  itemsPerPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = searchResults.slice(startIndex, endIndex);
  // console.log(displayedResults);

  return (
    <ul id="pokedex">
      {displayedResults.map((pokemon) => (
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
};

export default PokemonList;

// import { PokemonData } from '../../types/types';

// const PokemonList = ({ searchResults }: { searchResults: PokemonData[] }) => (
//   <ul id="pokedex">
//     {searchResults.map((pokemon) => (
//       <li
//         key={pokemon.id}
//         className="card"
//         style={{ padding: '2%', margin: '2%', listStyleType: 'none' }}
//       >
//         <img className="card-image" src={pokemon.image} alt={pokemon.name} />
//         <h2 className="card-title">{pokemon.name}</h2>
//         <p className="card-subtitle">Type: {pokemon.type}</p>
//       </li>
//     ))}
//   </ul>
// );

// export default PokemonList;
