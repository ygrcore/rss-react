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
      ))}
    </ul>
  );
};

const getColorForType = (type: string) => {
  const types = type.split(',');
  const primaryType = types[0].trim();
  switch (primaryType) {
    case 'bug':
      return 'lightyellow';
    case 'fire':
      return 'lightsalmon';
    case 'grass':
      return 'lightgreen';
    case 'water':
      return 'lightblue';
    case 'normal':
      return 'lightgray';
    case 'poison':
      return 'lightseagreen';
    case 'electric':
      return 'yellow';
    case 'ground':
      return 'sandybrown';
    case 'fairy':
      return 'pink';
    case 'fighting':
      return 'crimson';
    case 'psychic':
      return 'lightpink';
    case 'rock':
      return 'darkkhaki';
    case 'ghost':
      return 'ghostwhite';
    case 'ice':
      return 'aliceblue';
    case 'dragon':
      return 'mediumpurple';
    case 'flying':
      return 'lightskyblue';
    default:
      return 'gray';
  }
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
