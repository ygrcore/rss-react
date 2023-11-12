import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';
import { PokedexContext } from '../../PokedexContext/PokedexContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
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
    updateSearchTerm: (newSearchTerm: string) => {
      context.searchTerm = newSearchTerm;
      localStorage.setItem('term', newSearchTerm);
    },
    updateItemsPerPage: () => {},
  };

  const searchTerm = 'bulbasaur';

  test('input should be empty initially', async () => {
    render(
      <BrowserRouter>
        <PokedexContext.Provider value={context}>
          <SearchBar onSearch={jest.fn()} />
        </PokedexContext.Provider>
      </BrowserRouter>
    );
    const textInput = screen.getByTestId('input-text');
    expect(textInput).toHaveValue('');
  });
  it('changing input value by clicking button and change value in useContext', async () => {
    await waitFor(() => {
      const newSearchTerm = 'bulbasaur';
      context.updateSearchTerm(newSearchTerm);
    });
    render(
      <BrowserRouter>
        <PokedexContext.Provider value={context}>
          <SearchBar onSearch={jest.fn()} />
        </PokedexContext.Provider>
      </BrowserRouter>
    );
    const input = screen.getByTestId('input-text');
    const button = screen.getByRole('button');

    fireEvent.click(button);
    await waitFor(() => expect(input).toHaveValue('bulbasaur'));
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    await waitFor(() => {
      const newSearchTerm = 'bulbasaur';
      context.updateSearchTerm(newSearchTerm);
    });
    render(
      <PokedexContext.Provider value={context}>
        <SearchBar onSearch={jest.fn()} />
      </PokedexContext.Provider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: searchTerm } });
    fireEvent.click(button);

    const localStorageValue =
      localStorage.getItem('term') || JSON.stringify('');
    expect(localStorageValue).toBe('bulbasaur');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('inputValue', JSON.stringify('bulbasaur'));
    render(
      <BrowserRouter>
        <PokedexContext.Provider value={context}>
          <SearchBar onSearch={jest.fn()} />
        </PokedexContext.Provider>
      </BrowserRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('bulbasaur');
  });
});
