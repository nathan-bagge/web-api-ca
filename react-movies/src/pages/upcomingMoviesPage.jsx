import React, {useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const UpcomingMoviesPage = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["upcoming", page],
    queryFn: getUpcomingMovies,
    queryFn: () => getUpcomingMovies(page),
    keepPreviousData: true,
    });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <>
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToWatchListIcon movie={movie} />;
      }}
    />
    <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ my: 4 }}
      >
        <Typography variant="body1">Page: {page}</Typography>
        <Pagination
          count={data.total_pages > 500 ? 500 : data.total_pages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </>
  );
};

export default UpcomingMoviesPage;
