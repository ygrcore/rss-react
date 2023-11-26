import {
  render,
  fireEvent,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { PokemonData } from '../../types/types';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import PokemonList from '../PokemonList/PokemonList';

import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

console.error = jest.fn();
const store = setupStore();

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
describe('PokemonCard', () => {
  const props = {
    searchResults: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ],
    currentPage: 1,
    children: null,
  };

  const mockPokemonData: PokemonData = {
    id: '1',
    name: 'bulbasaur',
    type: 'grass',
    image: 'bulbasaur.png',
  };

  test('Ensure that the card component renders the relevant card data', () => {
    const { getByText, getByAltText } = render(
      <Wrapper>
        <PokemonCard pokemon={mockPokemonData} currentPage={1} />
      </Wrapper>
    );

    expect(getByText('bulbasaur')).toBeInTheDocument();
    expect(getByText('Type: grass')).toBeInTheDocument();
    expect(getByAltText('bulbasaur')).toBeInTheDocument();
  });

  it('opens a detailed card component by clicking on card', async () => {
    await act(async () => {
      render(
        <Wrapper>
          <PokemonCard pokemon={mockPokemonData} currentPage={1} />
        </Wrapper>
      );
    });

    userEvent.click(screen.getByRole('listitem'));
    expect(screen.getByRole('link').getAttribute('href')).toBe(
      '?page=1/bulbasaur'
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
      <Wrapper>
        <PokemonList {...props} />
        <PokemonCard pokemon={mockPokemonData} currentPage={1} />
      </Wrapper>
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
