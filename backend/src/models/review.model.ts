import { Document, Schema, model } from "mongoose";

export interface IReview extends Document {
  _id: string;
  content: string;
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  rating: number;
  isUser: boolean;
}

const ReviewSchema = new Schema<IReview>(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
    },
    isUser: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Review = model("Review", ReviewSchema);

export default Review;
