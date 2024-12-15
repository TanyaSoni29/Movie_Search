import React, { useEffect, useRef, useState } from "react";

function Search({ query, setQuery }) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.focus();
  }, []);
  return (
    <input
      ref={searchRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
