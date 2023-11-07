import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { PokemonData, PokemonResult } from '../../types/types';
import { stopPropagation } from '../../utils/eventHandler/stopPropaganation';
import Spinner from '../spinner/Spinner';
import PokeApi from '../../services/PokeApi';

import './PokemonList.css';

type PokemonListProps = {
  pokemonList: PokemonResult[];
  searchResults: PokemonResult[];
  currentPage: number;
  itemsPerPage: number;
};

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonList,
  searchResults,
  currentPage,
  itemsPerPage,
}) => {
  const { getUrlsFromPreloadedPokes } = PokeApi();
  const [pokemonPerPage, setPokemonPerPage] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = searchResults.length
    ? searchResults.slice(startIndex, endIndex)
    : pokemonList.slice(startIndex, endIndex);

  console.log(displayedResults);

  useEffect(() => {
    setIsLoading(true);
    fetchPokes();
  }, [currentPage, pokemonList, searchResults]);

  const fetchPokes = async () => {
    const pokemonData = await getUrlsFromPreloadedPokes(displayedResults);
    setPokemonPerPage(pokemonData);
    setIsLoading(false);
  };

  const [outletVisible, setOutletVisible] = useState(true);

  useEffect(() => {
    document.addEventListener('click', closeHandle);

    return () => {
      document.removeEventListener('click', closeHandle);
    };
  }, []);

  const closeHandle: EventListener = (event): void => {
    const element = event.target as HTMLElement;
    if (
      element &&
      !(
        element.classList.contains('pokemons__outlet') ||
        element.classList.contains('card') ||
        element.classList.contains('card-image') ||
        element.classList.contains('card-title') ||
        element.classList.contains('card-subtitle')
      )
    ) {
      setOutletVisible(false);
    } else {
      setOutletVisible(true);
    }
  };

  return (
    <div className="pokemons">
      <div className="pokemons__list">
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '500px',
            }}
          >
            <Spinner />
          </div>
        ) : (
          <ul id="pokedex">
            {pokemonPerPage.map((pokemon) => (
              <Link key={pokemon.id} to={`${pokemon.name}?page=${currentPage}`}>
                <li
                  className="card"
                  style={{
                    backgroundColor: pokemon.type
                      ? getColorForType(pokemon.type)
                      : 'gray',
                  }}
                >
                  <img
                    className="card-image"
                    src={pokemon.image}
                    alt={pokemon.name}
                  />
                  <h2 className="card-title">{pokemon.name}</h2>
                  <p className="card-subtitle">Type: {pokemon.type}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <div
        className="pokemons__outlet"
        onClick={stopPropagation}
        style={{ display: outletVisible ? 'flex' : 'none' }}
      >
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
