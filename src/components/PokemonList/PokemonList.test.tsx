import PokemonList from './PokemonList';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

console.error = jest.fn();
const store = setupStore();

const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe('PokemonList', () => {
  const mockRouter = {
    query: { page: 'bulbasaur' },
    push: jest.fn(),
  };
  useRouterMock.mockReturnValue(mockRouter);
  const props = {
    searchResults: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ],
    currentPage: 1,
    children: <PokemonDetails />,
  };

  test('Verify that the component renders with mocked value', async () => {
    act(() => {
      render(
        <Wrapper>
          <PokemonList {...props} />
        </Wrapper>
      );
    });

    const pokemonElement = await screen.findByText(/bulbasaur/i);
    expect(pokemonElement).toBeInTheDocument();
  });

  test('Verify that the component renders the specified number of cards', async () => {
    await act(async () => {
      render(<Wrapper>{<PokemonList {...props} />}</Wrapper>);
    });

    const cards = await screen.getAllByRole('listitem');
    expect(cards.length).toBe(1);
  });

  test('Check that an appropriate message "Nothing Found" is displayed if no cards are present', async () => {
    const props = {
      searchResults: [],
      currentPage: 1,
      children: <PokemonDetails />,
    };

    localStorage.setItem('searchedPokes', '[]');

    await act(async () => {
      render(
        <Wrapper>
          <PokemonList {...props} />
        </Wrapper>
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
        <Wrapper>
          <PokemonList {...props} />
        </Wrapper>
      );
    });

    userEvent.click(screen.getByRole('listitem'));
    expect(screen.getByRole('link').getAttribute('href')).toBe(
      '?page=1/bulbasaur'
    );
  });
});
