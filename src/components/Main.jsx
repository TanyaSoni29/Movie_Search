import React, { useState } from "react";

import WatchedSummery from "./Main/WatchedSummery";
import WatchedMovieList from "./Main/WatchedMovieList";
import Box from "./Box";

function Main({ tempWatchedData, children }) {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className="main">
      <Box>{children}</Box>
      <Box>
        <WatchedSummery watched={watched} />
        <WatchedMovieList watched={watched} />
      </Box>
    </main>
  );
}

export default Main;

// the above is implicit passing but we also have one other way that is explicit passing 
// <Box element={children} /> or <Box element={ <> <WatchedSummary watched={watched} /> <WatchedMovieList watched={watched} /> </>} />
