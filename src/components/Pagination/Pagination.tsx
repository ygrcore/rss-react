import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Pagination.css';
import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
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
  onPageChange,
}) => {
  const [searchParams] = useSearchParams('page=1');
  const query = useQuery();
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <div className="pagination">
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
