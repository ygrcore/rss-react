import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import PokemonDetails from './PokemonDetails';

import fetchMock from 'jest-fetch-mock';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

console.error = jest.fn();
const store = setupStore();

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe('PokemonDetails', () => {
  const data = {};

  beforeAll(() => {
    fetchMock.mockOnceIf('https://pokeapi.co/api/v2/pokemon/bilbasaur', () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  test('renders Pokemon details correctly', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Wrapper>
            <PokemonDetails />
          </Wrapper>
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const pokemonDetails = screen.findByText(/Pokemon Details for bulbasaur/);
      const altText = screen.findByAltText(/bulbasaur/);
      const pokemonNumber = screen.findByText(/Pokemon number: 1/);
      const pokemonName = screen.findByText(/Pokemon name: bulbasaur/);

      expect(pokemonDetails).toBeTruthy();
      expect(altText).toBeTruthy();
      expect(pokemonNumber).toBeTruthy();
      expect(pokemonName).toBeTruthy();
    });
  });
});
