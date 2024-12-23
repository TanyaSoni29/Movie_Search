import React, { useEffect, useRef, useState } from "react";
import StarRatings from "../StarRatings";
import Loader from "../Loader";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched?.map((movie) => movie?.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie?.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // refs are used to persist the data between renders without triggering rerendering...
  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);
  // the above comment statement is telling us that if we want to store the value across rerendering without losing its previous one then we have to use useRef hook as they are not lost across rerendering while if we use normal variable then after each rerendering it is initialize with default value and lost it's previous stored value so we use UseRef when we want to persist the value between renderings....
  useEffect(() => {
    async function fetchMovieDeatils() {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_OMDB_API}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovieDeatils();
  }, [selectedId]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
        console.log(`Clean Up function for ${title} `); //when movieDetail is unmounted then this cleanup function run but due to concept of closure here title of movie is printed
      };
    },
    [title]
  );

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") onCloseMovie();
    }
    document.addEventListener("keydown", callback); // here we need clean up function because whenever we open new movie then a new event listener added to that so whenever esc is press then if we console any thing then that console is like accumulating that's why whenever we have large application and have event listner then we should also write cleanup function for that event listener...

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRatings
                    maxLength={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You Rate this movie with {watchedUserRating} <span>⭐</span>{" "}
                  before.
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
            <p></p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
