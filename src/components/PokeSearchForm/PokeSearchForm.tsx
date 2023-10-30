import { Component } from 'react';
import PokeApi from '../../services/PokeApi';

const pokemon = new PokeApi();

interface PokeSearchFormProps {}

interface PokeSearchFormState {
  searchTerm: string;
  pokemons: string[];
  searchResults: string[];
  error: string;
}

class PokeSearchForm extends Component<
  PokeSearchFormProps,
  PokeSearchFormState
> {
  constructor(props: PokeSearchFormProps) {
    super(props);
    const items = localStorage.getItem('searchedPokes');
    this.state = {
      searchTerm: localStorage.getItem('term') || '',
      pokemons: [],
      searchResults: items ? JSON.parse(items) : [],
      error: '',
    };
  }

  componentDidMount() {
    this.getPokemons();
  }

  getPokemons = async () => {
    const response = await pokemon.getPokemonsNames();
    this.setState({
      pokemons: response,
    });
    localStorage.setItem('response', JSON.stringify(response));
  };

  handleSearch = () => {
    this.searchForPokes();
  };

  searchForPokes = () => {
    try {
      const { searchTerm, pokemons } = this.state;
      const searchTermRegex = new RegExp(searchTerm, 'i');
      localStorage.setItem('term', searchTerm);
      const searchResults = pokemons.filter((pokemon) =>
        searchTermRegex.test(pokemon)
      );
      this.setState({
        searchResults,
        error: '',
      });
      localStorage.setItem('searchedPokes', JSON.stringify(searchResults));
    } catch (err) {
      this.setState({
        searchResults: [],
        error: 'No results found or an error occurred.',
      });
    }
  };

  render() {
    const { searchTerm, searchResults, error, pokemons } = this.state;

    return (
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => this.setState({ searchTerm: e.target.value })}
          placeholder="Search for a Pokémon"
        />
        <button onClick={this.handleSearch}>Search</button>
        {error && <p>{error}</p>}
        <ul>
          {searchResults.length
            ? searchResults.map((pokemon) => <li key={pokemon}>{pokemon}</li>)
            : pokemons.map((pokemon) => <li key={pokemon}>{pokemon}</li>)}
        </ul>
      </div>
    );
  }
}

export default PokeSearchForm;
