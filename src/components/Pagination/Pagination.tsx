import React from 'react';
import Link from 'next/link';

import styles from './Pagination.module.css';

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
      <div className={styles.pagination}>
        {pages.map((page) => (
          <Link
            href={`?page=${page}`}
            className={`${styles.pagination__button} ${
              currentPage === page ? styles.buttonActive : ''
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
