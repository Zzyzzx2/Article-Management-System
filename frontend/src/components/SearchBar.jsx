import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call onSearch on each change
  };

  const handleGoClick = () => {
    onSearch(query); // Call onSearch when the button is clicked
  };

  return (
    <div className="w-full flex justify-center mt-8 mb-8">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for books..."
        className="w-4/5 p-2 border border-gray-300 rounded mt-1"
      />
      <button
        onClick={handleGoClick}
        className="ml-2 p-2 bg-lime-500 text-white rounded hover:bg-lime-700 transition duration-300"
      >
        Go
      </button>
    </div>
  );
};

export default SearchBar;
