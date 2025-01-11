import React, { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const searchRef = useRef(null);
  // adding eventListener for enter key press
  useEffect(() => {
    function callBack(e) {
      if (document.activeElement === searchRef.current) return; // this statement is for when inputElement is already in focus then don't run that event Listener
      if (e.code === "Enter") {
        searchRef.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callBack);

    return () => document.addEventListener("keydown", callBack);
  }, [setQuery]); // here need to pass setQuery inn dependency array because it is used inside the useEffect and it is a prop
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
