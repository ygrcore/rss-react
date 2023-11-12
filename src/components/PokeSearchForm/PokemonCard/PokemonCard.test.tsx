import {
  render,
  fireEvent,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { PokemonData } from '../../../types/types';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { PokedexContext } from '../../PokedexContext/PokedexContext';
import userEvent from '@testing-library/user-event';
import PokemonList from '../PokemonList/PokemonList';

jest.mock('../../../services/PokeApi');
describe('PokemonCard', () => {
  const props = {
    searchResults: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ],
    currentPage: 1,
  };

  const mockPokemonData: PokemonData = {
    id: '1',
    name: 'bulbasaur',
    type: 'grass',
    image: 'bulbasaur.png',
  };

  const context = {
    pokemonList: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ],
    searchTerm: '',
    itemsPerPage: 10,
    updatePokemonList: () => {},
    updateSearchTerm: () => {},
    updateItemsPerPage: () => {},
  };
  test('Ensure that the card component renders the relevant card data', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <PokedexContext.Provider value={context}>
          <PokemonCard pokemon={mockPokemonData} currentPage={1} />
        </PokedexContext.Provider>
      </BrowserRouter>
    );

    expect(getByText('bulbasaur')).toBeInTheDocument();
    expect(getByText('Type: grass')).toBeInTheDocument();
    expect(getByAltText('bulbasaur')).toBeInTheDocument();
  });

  it('opens a detailed card component by clicking on card', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <PokedexContext.Provider value={context}>
            <PokemonCard pokemon={mockPokemonData} currentPage={1} />
          </PokedexContext.Provider>
        </BrowserRouter>
      );
    });

    userEvent.click(screen.getByRole('listitem'));
    expect(screen.getByRole('link').getAttribute('href')).toBe(
      '/bulbasaur?page=1'
    );
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const getPokemon = jest.fn(() =>
      Promise.resolve({
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      })
    );
    render(
      <BrowserRouter>
        <PokedexContext.Provider value={context}>
          <PokemonList {...props} />
          <PokemonCard pokemon={mockPokemonData} currentPage={1} />
        </PokedexContext.Provider>
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    const cardsElements = await screen.findAllByTestId('pokemon-card');
    const firstCardElement = cardsElements[0];
    expect(firstCardElement).toBeInTheDocument();

    fireEvent.click(firstCardElement);
    getPokemon();

    expect(getPokemon).toHaveBeenCalled();
    jest.clearAllMocks();
  });
});
