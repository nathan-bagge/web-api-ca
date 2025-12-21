import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        movieId: { type: Number, required: true },
        rating: { type: Number, required: true, min: 0, max: 10 },
        reviewText: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
