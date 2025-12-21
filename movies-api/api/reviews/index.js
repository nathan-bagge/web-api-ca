import express from "express";
import Review from "./reviewModel";
import asyncHandler from "express-async-handler";

const router = express.Router(); // eslint-disable-line

// Get current user's reviews
router.get(
  "/user/me",
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({userId: req.user._id}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  })
);

// Get all reviews
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  })
);

// Create a new review
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { movieId, rating, reviewText } = req.body;
    if (!movieId || rating === undefined) {
      return res
        .status(400)
        .json({ success: false, msg: "movieId, and rating are required." });
    }
    const newReview = await Review.create({ userId: req.user._id, movieId, rating, reviewText });
    res.status(201).json(newReview);
  })
);

router.put (
  "/:id",
  asyncHandler(async (req, res) => {
    const { rating, reviewText } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, msg: "Review not found." });
    }
    if (rating !== undefined) review.rating = rating;
    if (reviewText !== undefined) review.reviewText = reviewText;
    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  })
);

// Delete a review
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, msg: "Review not found." });
    }
    await review.remove();
    res.status(200).json({ success: true, msg: "Review deleted successfully." });
  })
);

export default router;