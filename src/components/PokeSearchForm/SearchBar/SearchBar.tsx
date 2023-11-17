// import { usePokedex } from '../../PokedexContext/usePokedex';
import { updateSearchTerm } from '../../../store/reducers/pokedexSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
  // const { updateSearchTerm, searchTerm } = usePokedex();
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.pokedexReducer);
  const handleSearch = () => {
    onSearch(searchTerm);
    localStorage.setItem('currentPage', '1');
  };

  return (
    <div>
      <input
        data-testid="input-text"
        type="text"
        value={searchTerm}
        placeholder="Search for a Pokémon"
        onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
