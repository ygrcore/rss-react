import { ReactNode } from 'react';
import { Signika } from 'next/font/google';
import Head from 'next/head';
import ForceError from '../components/forceError/ForceError';
import SearchBar from '../components/PokeSearchForm/SearchBar/SearchBar';
import PokemonPerPageSelect from '../components/PokeSearchForm/PokemonPerPageSelect/PokemonPerPageSelect';
import PokemonList from '../components/PokeSearchForm/PokemonList/PokemonList';
import Pagination from '../components/Pagination/Pagination';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useEffect } from 'react';
import {
  updateSearchResults,
  updateSearchTerm,
  updateItemsPerPage,
  updateCurrentPage,
  updatePokemonList,
} from '../store/reducers/pokedexSlice';
import { PokemonResult } from '../types/types';

const signika = Signika({ subsets: ['latin'] });

type LayoutProps = {
  children?: ReactNode;
  data: PokemonResult[];
};

const Layout = ({ children, data }: LayoutProps) => {
  const { pokemonList, searchResults, itemsPerPage, currentPage } =
    useAppSelector((state) => state.pokedexReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) dispatch(updatePokemonList(data));
  }, [data]);

  const router = useRouter();
  const { page, limit, pokemonName } = router.query;
  const href = pokemonName
    ? {
        pathname: '/',
        query: {
          page: page || '1',
          limit: limit || '10',
          pokemonName: pokemonName || '',
        },
      }
    : {
        pathname: '/',
        query: {
          page: page || '1',
          limit: limit || '10',
        },
      };
  const redirectToMain = () => {
    if (router.pathname === '/details/[id]') {
      router.push(href);
    }
  };

  const handleSearch = (term: string) => {
    dispatch(updateSearchTerm(term));
    const searchTermRegex = new RegExp(term, 'i');
    localStorage.setItem('term', term);
    const filteredResults = pokemonList.filter((pokemon) =>
      searchTermRegex.test(pokemon.name)
    );
    dispatch(updateSearchResults(filteredResults));
    localStorage.setItem('currentPage', '1');
    dispatch(updateCurrentPage(1));
    localStorage.setItem('searchedPokes', JSON.stringify(filteredResults));
  };

  const handlePageChange = (page: number) => {
    dispatch(updateCurrentPage(page));
    localStorage.setItem('currentPage', page.toString());
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    dispatch(updateItemsPerPage(newItemsPerPage));
  };

  return (
    <>
      <Head>
        <title>Pokemons</title>
        <meta name="description" content="Migrate from vite to nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      </Head>
      <main className={`${signika.className}`}>
        <div>
          <ForceError />
          <SearchBar onSearch={handleSearch} />
          <Pagination
            totalPages={Math.ceil(
              (data ? data.length : pokemonList.length) / itemsPerPage
            )}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <PokemonPerPageSelect onChange={handleItemsPerPageChange} />
          <PokemonList
            searchResults={searchResults}
            currentPage={currentPage}
          />
        </div>
        {children}
      </main>
    </>
  );
};
export default Layout;
