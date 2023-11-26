import { render, screen, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import PokemonDetails from './PokemonDetails';
import type { ReactNode } from 'react';

console.error = jest.fn();
const store = setupStore();

const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe('PokemonDetails', () => {
  const mockRouter = {
    query: { page: 'bulbasaur' },
    push: jest.fn(),
  };

  const data = {
    name: 'bulbasaur',
    image: 'bulbasaur-image-url',
    id: 1,
    type: 'grass',
  };

  beforeAll(() => {
    fetchMock.mockOnceIf('https://pokeapi.co/api/v2/pokemon/bulbasaur', () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  test('renders Pokemon details correctly after loader animation', async () => {
    useRouterMock.mockReturnValue(mockRouter);

    act(() => {
      render(
        <Wrapper>
          <PokemonDetails />
        </Wrapper>
      );
    });

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });

    await waitFor(() => {
      const pokemonDetails = screen.findByText('Pokemon Details for bulbasaur');
      const altText = screen.findByAltText('bulbasaur');
      const pokemonNumber = screen.findByText('Pokemon number: 1');
      const pokemonName = screen.findByText('Pokemon name: bulbasaur');

      expect(pokemonDetails).toBeTruthy();
      expect(altText).toBeTruthy();
      expect(pokemonNumber).toBeTruthy();
      expect(pokemonName).toBeTruthy();
    });
  });
});
