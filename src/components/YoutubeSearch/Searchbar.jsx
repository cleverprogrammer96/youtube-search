// SearchBar.js

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(term);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={term}
          onChange={handleInputChange}
          placeholder="Search for videos..."
          className="search-input"
        />
        <button
          type="submit"
          className={`search-button ${isFocused ? 'focused' : ''}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
