import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { PokemonData } from '../../types/types';

import './PokemonList.css';

type PokemonListProps = {
  searchResults: PokemonData[];
  currentPage: number;
  itemsPerPage: number;
};

// По сути это компонент Layout, тут создаются основные Links

const PokemonList: React.FC<PokemonListProps> = ({
  searchResults,
  currentPage,
  itemsPerPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = searchResults.slice(startIndex, endIndex);

  return (
    <div className="pokemons">
      <div className="pokemons__list">
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
              {/* <Link to={`/${pokemon.name}`}> */}
              <Link to={`${pokemon.name}?page=${currentPage}`}>
                <img
                  className="card-image"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <h2 className="card-title">{pokemon.name}</h2>
                <p className="card-subtitle">Type: {pokemon.type}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <hr /> */}
      <div className="pokemons__outlet">
        <Outlet />
      </div>
    </div>
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
