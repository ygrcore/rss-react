import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import PokemonDetails from './PokemonDetails';

jest.mock('../../services/PokeApi');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ pokemonName: 'bulbasaur' }),
}));

describe('PokemonDetails', () => {
  test('renders Pokemon details correctly', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <PokemonDetails />
        </BrowserRouter>
      );
    });

    await waitFor(async () => {
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
