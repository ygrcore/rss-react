import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('correct displays number of pagination buttons', async () => {
    const onPageChange = jest.fn();
    render(
      <Pagination totalPages={2} currentPage={1} onPageChange={onPageChange} />
    );

    const secondPageButton = screen.getByRole('link', { name: '2' });
    expect(secondPageButton).toBeInTheDocument();
  });

  it('updates URL query parameter when page changes', async () => {
    const onPageChange = jest.fn();
    render(
      <Pagination totalPages={2} currentPage={1} onPageChange={onPageChange} />
    );
    expect(window.location.pathname).toBe('/');

    const secondPageButton = screen.getByRole('link', { name: '2' });
    expect(secondPageButton.getAttribute('href')).toBe('?page=2');
  });
});
