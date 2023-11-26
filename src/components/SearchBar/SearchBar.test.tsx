import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { updateSearchTerm } from '../../store/reducers/pokedexSlice';

console.error = jest.fn();
const store = setupStore();

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe('SearchBar', () => {
  test('input should be empty initially', () => {
    render(
      <BrowserRouter>
        <Wrapper>
          <SearchBar onSearch={jest.fn()} />
        </Wrapper>
      </BrowserRouter>
    );
    const textInput = screen.getByTestId('input-text');
    expect(textInput).toHaveValue('');
  });

  test('changing input value by clicking button and change value in useContext', async () => {
    const newSearchTerm = 'bulbasaur';
    store.dispatch(updateSearchTerm(newSearchTerm));

    render(
      <BrowserRouter>
        <Wrapper>
          <SearchBar onSearch={jest.fn()} />
        </Wrapper>
      </BrowserRouter>
    );

    const input = screen.getByTestId('input-text');
    const button = screen.getByRole('button');

    await waitFor(() => {
      fireEvent.click(button);
      expect(input).toHaveValue('bulbasaur');
    });
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const newSearchTerm = 'bulbasaur';

    store.dispatch(updateSearchTerm(newSearchTerm));
    localStorage.setItem('term', newSearchTerm);

    render(
      <Wrapper>
        <SearchBar onSearch={jest.fn()} />
      </Wrapper>
    );

    const input = screen.getByTestId('input-text');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: newSearchTerm } });
    fireEvent.click(button);

    await waitFor(() => {
      const localStorageValue =
        localStorage.getItem('term') || JSON.stringify('');
      expect(localStorageValue).toBe('bulbasaur');
    });
  });

  test('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('inputValue', JSON.stringify('bulbasaur'));
    render(
      <BrowserRouter>
        <Wrapper>
          <SearchBar onSearch={jest.fn()} />
        </Wrapper>
      </BrowserRouter>
    );

    const inputElement = screen.getByTestId('input-text') as HTMLInputElement;
    expect(inputElement.value).toBe('bulbasaur');
  });
});
