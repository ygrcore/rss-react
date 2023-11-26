'use client';

import React, { useEffect, useState } from 'react';
import { PokemonData, PokemonResult } from '../../types/types';
import Spinner from '../spinner/Spinner';
import { PokeApi } from '../../services/PokeApi';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useAppSelector } from '../../hooks/redux';
import type { ReactNode } from 'react';

import styles from './PokemonList.module.css';

type PokemonListProps = {
  searchResults: PokemonResult[];
  currentPage: number;
  children: ReactNode;
};

const PokemonList: React.FC<PokemonListProps> = ({
  searchResults,
  currentPage,
  children,
}) => {
  const { itemsPerPage, pokemonList } = useAppSelector(
    (state) => state.pokedexReducer
  );

  const [pokemonPerPage, setPokemonPerPage] = useState<PokemonData[]>([]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = searchResults.length
    ? searchResults.slice(startIndex, endIndex)
    : pokemonList.slice(startIndex, endIndex);

  const { data, isLoading, isError, isFetching } =
    PokeApi.useGetUrlsFromPreloadedPokesQuery(displayedResults);

  useEffect(() => {
    fetchPokes();
  }, [data, currentPage, pokemonList, searchResults]);

  const fetchPokes = async () => {
    if (data) {
      setPokemonPerPage(data);
    }
  };

  // const [outletVisible, setOutletVisible] = useState(true);

  // useEffect(() => {
  //   document.addEventListener('click', closeHandle);

  //   return () => {
  //     document.removeEventListener('click', closeHandle);
  //   };
  // }, []);

  // const closeHandle: EventListener = (event): void => {
  //   const element = event.target as HTMLElement;
  //   if (
  //     element &&
  //     !(
  //       element.classList.contains('pokemons__outlet') ||
  //       element.classList.contains('card') ||
  //       element.classList.contains('cardImage') ||
  //       element.classList.contains('cardTitle') ||
  //       element.classList.contains('cardSubtitle')
  //     )
  //   ) {
  //     setOutletVisible(false);
  //   } else {
  //     setOutletVisible(true);
  //   }
  // };
  let searchedPokesString;
  if (typeof window !== 'undefined') {
    searchedPokesString = localStorage.getItem('searchedPokes');
  }
  return (
    <div className={styles.pokemons}>
      <div className={styles.pokemons__list}>
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
        {searchedPokesString && JSON.parse(searchedPokesString).length === 0 ? (
          <p>Nothing Found</p>
        ) : null}
        {isFetching ? null : (
          <ul id={styles.pokedex}>
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
        className={styles.pokemons__outlet}
        // style={{ display: outletVisible ? 'flex' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
};

export default PokemonList;
