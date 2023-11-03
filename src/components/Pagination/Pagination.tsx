import React from 'react';
import './Pagination.css';

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
  console.log(pages);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          // className="pagination__button"
          className={`pagination__button ${
            Number(localStorage.getItem('currentPage')) === page
              ? 'button-active'
              : ''
          }`}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
