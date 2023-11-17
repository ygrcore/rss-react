import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
// import { PokemonData } from '../../types/types';
// import { useAppSelector } from '../../hooks/redux';

import './Pagination.css';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  // searchResults: PokemonData[];
  onPageChange: (page: number) => void;
};

type ChildProps = {
  page: string;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  // searchResults,
  onPageChange,
}) => {
  // const {searchResults, pokemonList} = useAppSelector(state => state.pokedexReducer);
  const [searchParams] = useSearchParams('page=1');
  const query = useQuery();
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // console.log('query', query);
  // console.log('pages', pages);
  // console.log(searchResults);

  return (
    <>
      <div className="pagination">
        {/* {searchResults.length */}
        {pages.map((page) => (
          <Link
            to={`?page=${page}`}
            className={`pagination__button ${
              currentPage === page ? 'button-active' : ''
            }`}
            key={page}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </Link>
        ))}
        {/* // : null */}
      </div>
      <Child
        page={searchParams.get('page') || query.get('page') || ''}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Child({ page, totalPages, onPageChange }: ChildProps) {
  useEffect(() => {
    if (totalPages < +page) {
      onPageChange(1);
    } else {
      onPageChange(+page);
    }
  });

  return (
    <div>
      {page ? (
        <h3>
          The <code>page</code> in the query string is &quot;{page}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}

export default Pagination;
