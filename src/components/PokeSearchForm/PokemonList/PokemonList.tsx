import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PokemonData, PokemonResult } from '../../../types/types';
import { stopPropagation } from '../../../utils/eventHandler/stopPropaganation';
import Spinner from '../../spinner/Spinner';
// import PokeApi from '../../../services/PokeApi';
import { PokeApi } from '../../../services/PokeApi';
import PokemonCard from '../PokemonCard/PokemonCard';
// import { usePokedex } from '../../PokedexContext/usePokedex';

import './PokemonList.css';
import { useAppSelector } from '../../../hooks/redux';
// import { updatePokemonList } from '../../../store/reducers/pokedexSlice';

type PokemonListProps = {
  searchResults: PokemonResult[];
  currentPage: number;
};

const PokemonList: React.FC<PokemonListProps> = ({
  searchResults,
  currentPage,
}) => {
  // const { itemsPerPage, pokemonList } = usePokedex();
  const { itemsPerPage, pokemonList } = useAppSelector(
    (state) => state.pokedexReducer
  );
  // const dispatch = useAppDispatch();

  // const { getUrlsFromPreloadedPokes } = PokeApi();
  const [pokemonPerPage, setPokemonPerPage] = useState<PokemonData[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = searchResults.length
    ? searchResults.slice(startIndex, endIndex)
    : pokemonList.slice(startIndex, endIndex);

  const { data, isLoading, isError, isFetching } =
    PokeApi.useGetUrlsFromPreloadedPokesQuery(displayedResults);

  useEffect(() => {
    // setIsLoading(true);
    fetchPokes();
  }, [data, currentPage, pokemonList, searchResults]);

  const fetchPokes = async () => {
    // const pokemonData = await getUrlsFromPreloadedPokes(displayedResults);
    if (data) {
      setPokemonPerPage(data);
    }
    // setIsLoading(false);
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
        {(isLoading || isFetching) && (
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
        )}
        {isFetching ? null : (
          <ul id="pokedex">
            {pokemonPerPage?.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                currentPage={currentPage}
              />
            ))}
          </ul>
        )}
        {isError && <p>Nothing Found</p>}
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

export default PokemonList;
