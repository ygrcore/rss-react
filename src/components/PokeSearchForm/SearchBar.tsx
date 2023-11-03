import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('term') || ''
  );

  const handleSearch = () => {
    onSearch(searchTerm);
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
