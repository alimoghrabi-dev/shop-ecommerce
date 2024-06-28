import { Schema, model } from "mongoose";
const ReviewSchema = new Schema({
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
}, { timestamps: true });
const Review = model("Review", ReviewSchema);
export default Review;
//# sourceMappingURL=review.model.js.map