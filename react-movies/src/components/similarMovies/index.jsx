import React from "react";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";
import PageTemplate from "../templateMovieListPage";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import { getSimilarMovies } from "../../api/tmdb-api";

const SimilarMovies = ({ movieId }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["similar", { id: movieId }],
    queryFn: getSimilarMovies,
  });

  if (isPending) return <Spinner />;
  if (isError)
    return <Typography variant="h6" color="error">{error.message}</Typography>;

  const movies = data.results;

  if (movies.length === 0) {
    return <Typography variant="h6">No similar movies available.</Typography>;
  }

  return (
    <PageTemplate
      title="Similar Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
      hideFilter={true}
      hideArrows={true}
    />
  );
};

export default SimilarMovies;
