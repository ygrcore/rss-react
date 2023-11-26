import React from 'react';
import Link from 'next/link';

// import './Pagination.css';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <div className="pagination">
        {pages.map((page) => (
          <Link
            href={`?page=${page}`}
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
    </>
  );
};

export default Pagination;
