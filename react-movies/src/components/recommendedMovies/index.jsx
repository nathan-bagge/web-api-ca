import React from "react";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { getMovieRecommendations } from "../../api/tmdb-api";
import PageTemplate from "../templateMovieListPage";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";

const RecommendedMovies = ({ movieId }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recommendations", { id: movieId }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) return <Spinner />;
  if (isError)
    return <Typography variant="h6" color="error">{error.message}</Typography>;

  const movies = data.results;

  if (movies.length === 0) {
    return <Typography variant="h6">No recommendations available.</Typography>;
  }

  return (
    <PageTemplate
    title="Recommended Movies"
    movies={movies}
    action={(movie) => <AddToFavoritesIcon movie={movie} />}
    hideFilter={true}
    hideArrows={true}
    />

  );
};

export default RecommendedMovies;
