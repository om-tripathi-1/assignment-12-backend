import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    images: [
        {
            type: String,
        },
    ],
    variants: [
        {
            size: {
                type: String,
                enum: ["Small", "Medium", "Large", "X-large"],
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 0,
            },
        },
    ],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    originalPrice: {
        type: Number,
        min: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    // reviews: {}
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);
export default Product;
