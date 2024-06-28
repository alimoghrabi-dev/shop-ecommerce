import { Schema, model } from "mongoose";
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    isOnSale: {
        type: Boolean,
        default: false,
    },
    salePrice: {
        type: Number,
        default: 0,
    },
    isOutOfStock: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Product = model("Product", ProductSchema);
export default Product;
//# sourceMappingURL=product.model.js.map