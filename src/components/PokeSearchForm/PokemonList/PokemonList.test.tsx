import PokemonList from './PokemonList';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PokedexContext } from '../../PokedexContext/PokedexContext';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('../../../services/PokeApi');

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

  const context = {
    pokemonList: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ],
    searchResults: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ],
    searchTerm: '',
    itemsPerPage: 10,
    currentPage: 1,
    updatePokemonList: () => {},
    updateSearchResults: () => {},
    updateSearchTerm: () => {},
    updateItemsPerPage: () => {},
    updateCurrentPage: () => {},
  };

  test('Verify that the component renders with mocked value', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <PokedexContext.Provider value={context}>
            <Routes>
              <Route path="/" element={<PokemonList {...props} />} />
            </Routes>
          </PokedexContext.Provider>
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
          <PokedexContext.Provider value={context}>
            <Routes>
              <Route path="/" element={<PokemonList {...props} />} />
            </Routes>
          </PokedexContext.Provider>
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
    await act(async () => {
      render(
        <BrowserRouter>
          <PokedexContext.Provider value={context}>
            <Routes>
              <Route path="/" element={<PokemonList {...props} />} />
            </Routes>
          </PokedexContext.Provider>
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
          <PokedexContext.Provider value={context}>
            <Routes>
              <Route path="/*" element={<PokemonList {...props} />} />
            </Routes>
          </PokedexContext.Provider>
        </BrowserRouter>
      );
    });

    userEvent.click(screen.getByRole('listitem'));
    expect(screen.getByRole('link').getAttribute('href')).toBe(
      '/bulbasaur?page=1'
    );
  });
});
