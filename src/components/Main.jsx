import React, { useState } from "react";

import WatchedSummery from "./Main/WatchedSummery";
import WatchedMovieList from "./Main/WatchedMovieList";
import Box from "./Box";
import MovieDetails from "./Main/MovieDetails";

function Main({
  selectedId,
  children,
  onCloseMovie,
  watched,
  onAddWatched,
  onDeleteWatched,
}) {
  return (
    <main className="main">
      <Box>{children}</Box>
      <Box>
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={onCloseMovie}
            onAddWatched={onAddWatched}
            watched={watched}
          />
        ) : (
          <>
            <WatchedSummery watched={watched} />
            <WatchedMovieList
              watched={watched}
              onDeleteWatched={onDeleteWatched}
            />
          </>
        )}
      </Box>
    </main>
  );
}

export default Main;

// the above is implicit passing but we also have one other way that is explicit passing
// <Box element={children} /> or <Box element={ <> <WatchedSummary watched={watched} /> <WatchedMovieList watched={watched} /> </>} />
