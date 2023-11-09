import { usePokedex } from '../../PokedexContext/usePokedex';

const SearchBar = ({
  onSearch,
  searchTerm,
}: {
  onSearch: (term: string) => void;
  searchTerm: string;
}) => {
  const { updateSearchTerm } = usePokedex();
  const handleSearch = () => {
    onSearch(searchTerm);
    localStorage.setItem('currentPage', '1');
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search for a Pokémon"
        onChange={(e) => updateSearchTerm(e.target.value)}
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
