import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            size: {
                type: String,
                default: "Standard",
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
}, {
    timestamps: true
});

export default mongoose.model("Order", orderSchema);