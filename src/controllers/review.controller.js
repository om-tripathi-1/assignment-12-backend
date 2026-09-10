import Review from "../models/reviews.model.js";
import Order from "../models/order.model.js";

export const createReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    if (!rating || !comment) {
        return res.status(400).json({ message: "Rating and comment are required" });
    }

    try {
        const order = await Order.findOne({
            user: userId,
            "products.product": productId
        });

        if (!order) {
            return res.status(403).json({ message: "You can only review products you have purchased" });
        }

        const review = new Review({ user: userId, product: productId, rating: Number(rating), comment });
        await review.save();
        await review.populate("user", "name email");
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

export const checkCanReview = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const order = await Order.findOne({
            user: userId,
            "products.product": productId
        });

        res.status(200).json({ canReview: Boolean(order) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

