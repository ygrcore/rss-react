import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('updates URL query parameter when page changes', async () => {
    const onPageChange = jest.fn();
    render(
      <MemoryRouter initialEntries={['/?page=1']} initialIndex={1}>
        <Pagination
          totalPages={2}
          currentPage={1}
          onPageChange={onPageChange}
        />
      </MemoryRouter>
    );
    expect(window.location.pathname).toBe('/');

    const secondPageButton = screen.getByRole('link', { name: '2' });
    expect(secondPageButton.getAttribute('href')).toBe('/?page=2');

    userEvent.click(secondPageButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
