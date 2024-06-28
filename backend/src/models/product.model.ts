import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  userId: Schema.Types.ObjectId;
  description: string;
  price: number;
  images: Array<string>[];
  category: Schema.Types.ObjectId;
  averageRating: number;
  isOnSale: boolean;
  salePrice: number;
  isOutOfStock: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
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
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);

export default Product;
