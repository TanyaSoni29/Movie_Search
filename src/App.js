import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Navbar/Search";
import NumResults from "./components/Navbar/NumResults";
import MovieList from "./components/Main/MovieList";
// import StarRatings from "./components/StarRatings";
import Loader from "./components/Loader";
import Error from "./components/Error";

console.log(process.env.REACT_APP_OMDB_API);
export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // here we can use that custom hook here like this
  // const {movies, isLoading, error} = useMovies(query, handleCloseMovie) // we are using before declaration of function this could happen only when we are using function statement not arrow function for their declaration this is happening because of the concept of hoisting of function
  const [watched, setWatched] = useState(() => {
    const storedList = localStorage.getItem("watched");
    return JSON.parse(storedList);
  });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // for adding keypress and other event listener we use useRef hook this make the selection of the element easy and we have to write less code for that event listening
  // always do practice with event listener so that it will be very helpful ....
  useEffect(() => {
    async function fetchMoviesData() {
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
    handleCloseMovie(); // some movie is open and we want whenver we search for second movie then it will close the movieDetails which is open....
    fetchMoviesData();
  }, [query]);
  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main
        watched={watched}
        selectedId={selectedId}
        onCloseMovie={handleCloseMovie}
        onAddWatched={handleAddWatched}
        onDeleteWatched={handleDeleteWatched}
      >
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
        )}
        {error && <Error error={error} />}
      </Main>
      {/* <StarRatings maxLength={10} defaultRating={5} /> */}
    </>
  );
}
