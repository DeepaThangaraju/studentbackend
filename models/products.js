import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    use: { type: [String], required: true }
}, { timeStramps: true });

export const productModel = mongoose.model("product", productSchema);