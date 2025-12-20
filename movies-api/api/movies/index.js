import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api'; 
import { getUpcoming } from '../tmdb-api';
import { getTrendingToday } from '../tmdb-api';
import { getNowPlayingMovies } from '../tmdb-api';
import { getTopRatedMovies } from '../tmdb-api';
import { getMovie } from '../tmdb-api';
import { getRecommendations } from '../tmdb-api';
import { getSimilar } from '../tmdb-api';
import { getMovieReviews } from '../tmdb-api';
import { getGenres } from '../tmdb-api';
import { getMovieImages } from '../tmdb-api';

const router = express.Router();

router.get('/discover', asyncHandler(async (_req, res) => {
  res.status(200).json(await getMovies());
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  res.status(200).json(await getUpcoming(req.query.page || 1));
}));

router.get('/trending/today', asyncHandler(async (req, res) => {
  res.status(200).json(await getTrendingToday(req.query.page || 1));
}));

router.get('/nowplaying', asyncHandler(async (req, res) => {
  res.status(200).json(await getNowPlayingMovies(req.query.page || 1));
}));

router.get('/toprated', asyncHandler(async (req, res) => {
  res.status(200).json(await getTopRatedMovies(req.query.page || 1));
}));

router.get('/genres/list', asyncHandler(async (_req, res) => {
  res.status(200).json(await getGenres());
}));

router.get('/:id', asyncHandler(async (req, res) => {
  res.status(200).json(await getMovie(req.params.id));
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
  res.status(200).json(await getRecommendations(req.params.id, req.query.page || 1));
}));

router.get('/:id/similar', asyncHandler(async (req, res) => {
  res.status(200).json(await getSimilar(req.params.id, req.query.page || 1));
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieReviews(req.params.id, req.query.page || 1));
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieImages(req.params.id));
}));


export default router;
