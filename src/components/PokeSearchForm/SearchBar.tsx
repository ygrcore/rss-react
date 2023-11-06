const SearchBar = ({
  onSearch,
  searchTerm,
  setSearchTerm,
}: {
  onSearch: (term: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => {
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
        onChange={(e) => setSearchTerm(e.target.value)}
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
