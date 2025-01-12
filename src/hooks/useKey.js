import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener("keydown", callback); // here we need clean up function because whenever we open new movie then a new event listener added to that so whenever esc is press then if we console any thing then that console is like accumulating that's why whenever we have large application and have event listner then we should also write cleanup function for that event listener...

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}

// those enter key functionality can also fetch from this useKey hook by using it like this useKey("Enter", function () {
//  if (document.activeElement === searchRef.current) return; // this statement is for when inputElement is already in focus then don't run that event Listener
//  if (e.code === "Enter") {
//  searchRef.current.focus();
//  setQuery("");
//  }})
