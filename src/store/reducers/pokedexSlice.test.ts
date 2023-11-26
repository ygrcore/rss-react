import pokedexReducer, {
  updatePokemonList,
  updateSearchResults,
  updateSearchTerm,
  updateItemsPerPage,
  updateCurrentPage,
} from './pokedexSlice';

describe('pokedexSlice reducer', () => {
  it('should handle updatePokemonList', () => {
    const newState = pokedexReducer(
      {
        pokemonList: [],
        searchResults: [],
        searchTerm: '',
        itemsPerPage: 10,
        currentPage: 1,
        isLoading: false,
        error: '',
      },
      updatePokemonList([
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ])
    );

    expect(newState.pokemonList).toEqual([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ]);
  });

  it('should handle updateSearchResults', () => {
    const newState = pokedexReducer(
      {
        pokemonList: [],
        searchResults: [],
        searchTerm: '',
        itemsPerPage: 10,
        currentPage: 1,
        isLoading: false,
        error: '',
      },
      updateSearchResults([
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ])
    );

    expect(newState.searchResults).toEqual([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ]);
  });

  it('should handle updateSearchTerm', () => {
    const newState = pokedexReducer(
      {
        pokemonList: [],
        searchResults: [],
        searchTerm: '',
        itemsPerPage: 10,
        currentPage: 1,
        isLoading: false,
        error: '',
      },
      updateSearchTerm('bulbasaur')
    );

    expect(newState.searchTerm).toEqual('bulbasaur');
  });

  it('should handle updateItemsPerPage', () => {
    const newState = pokedexReducer(
      {
        pokemonList: [],
        searchResults: [],
        searchTerm: '',
        itemsPerPage: 10,
        currentPage: 1,
        isLoading: false,
        error: '',
      },
      updateItemsPerPage(20)
    );

    expect(newState.itemsPerPage).toEqual(20);
  });

  it('should handle updateCurrentPage', () => {
    const newState = pokedexReducer(
      {
        pokemonList: [],
        searchResults: [],
        searchTerm: '',
        itemsPerPage: 10,
        currentPage: 1,
        isLoading: false,
        error: '',
      },
      updateCurrentPage(2)
    );

    expect(newState.currentPage).toEqual(2);
  });
});
