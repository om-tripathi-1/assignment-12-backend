import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    try {
        const review = new Review({ user: userId, product: productId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getReviewsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ product: productId }).populate("user", "name email");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

