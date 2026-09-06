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
                enum: ["Small", "Medium", "Large", "X-large"],
            },
            quantity: {
                type: Number,
            },
        },
    ],
    price: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    // reviews: {}
},{ timestamps:true });

const Product = mongoose.model("product", productSchema);
export default Product;
