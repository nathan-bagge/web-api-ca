import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromWatchListIcon from "../components/cardIcons/removeFromWatchList";

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchMovieQueries = useQueries({
    queries: movieIds.map((id) => ({
      queryKey: ["movie", { id }],
      queryFn: getMovie,
    })),
  });
  const isPending = mustWatchMovieQueries.some((q) => q.isPending);
  if (isPending) return <Spinner />;

  const movies = mustWatchMovieQueries
    .map((q) => q.data)
    .filter(Boolean)
    .map((m) => {
      m.genre_ids = m.genres.map((g) => g.id);
      return m;
    });

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => (
        <RemoveFromWatchListIcon movie={movie} />
      )}
    />
  );
};

export default MustWatchMoviesPage;
