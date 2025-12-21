import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { addReview } from "../api/review";
import { useNavigate, useLocation } from "react-router-dom";

const WriteReviewPage = () => {
  const location = useLocation();
  const movieId = location.state.movieId;
  const navigate = useNavigate();

 const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ['movie', {id: movieId}],
    queryFn: getMovie,
  });

  const handleSubmit = async ({ rating, reviewText }) => {
  await addReview(movieId, rating, reviewText);
  navigate("/profile");
};

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} onSubmit={handleSubmit} />
    </PageTemplate>
  );
};

export default WriteReviewPage;
