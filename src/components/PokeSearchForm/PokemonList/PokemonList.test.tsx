import PokemonList from './PokemonList';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setupStore } from '../../../store/store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

console.error = jest.fn();
const store = setupStore();

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe('PokemonList', () => {
  const props = {
    searchResults: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ],
    currentPage: 1,
  };

  test('Verify that the component renders with mocked value', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" element={<PokemonList {...props} />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      );
    });

    const pokemonElement = await screen.findByText(/bulbasaur/i);
    expect(pokemonElement).toBeInTheDocument();
  });

  test('Verify that the component renders the specified number of cards', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" element={<PokemonList {...props} />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      );
    });

    const cards = await screen.getAllByRole('listitem');
    expect(cards.length).toBe(1);
  });

  test('Check that an appropriate message "Nothing Found" is displayed if no cards are present', async () => {
    const props = {
      searchResults: [],
      currentPage: 1,
    };

    localStorage.setItem('searchedPokes', '[]');

    await act(async () => {
      render(
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" element={<PokemonList {...props} />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const nothingFoundMessage = screen.getByText(/Nothing Found/i);
      expect(nothingFoundMessage).toBeInTheDocument();
    });
  });

  test('opens a PokemonDetails component by clicking on link', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/*" element={<PokemonList {...props} />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      );
    });

    userEvent.click(screen.getByRole('listitem'));
    expect(screen.getByRole('link').getAttribute('href')).toBe(
      '/bulbasaur?page=1'
    );
  });
});
