import { useEffect, useState } from "react";

// here query will be the parameter not a prop this should be remember
// handleCloseMovie(); now this is also need to pass in useMovies hook if we want that functionality as well // some movie is open and we want whenever we search for second movie then it will close the movieDetails which is open....

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMoviesData() {
      callback?.(); // optional calling of a function if it is exist
      const controller = new AbortController(); // this is browser Api like fetch and it used to defend the race condition
      // race conditions are those conditions in which multiple api request go after one and another before completion that request if one of api completed before the completion of next request then we have old data in the screen and which leads no data sync properly
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `${process.env.REACT_APP_OMDB_API}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok)
          throw new Error("Failed to fetch, something went wrong...");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movies not found");
        setMovies(data.Search);
        setError("");
      } catch (error) {
        console.log(error.message);
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMoviesData();
  }, [query]);

  return { movies, isLoading, error };
}

// above is an example of how to make custom hook
// non-visual logics are contain by custom hook custom hook have one or more react hook for their definition
// reusable logic can be wrap up with custom hook...
