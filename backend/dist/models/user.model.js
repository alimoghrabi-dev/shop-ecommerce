import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
    },
    coverPic: {
        type: String,
    },
    bio: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    websiteUrl: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    categories: [
        {
            title: {
                type: String,
                required: true,
            },
        },
    ],
    cartItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    reviews: {
        type: [Schema.Types.ObjectId],
        ref: "Review",
    },
    averageRating: {
        type: Number,
        default: 0,
    },
});
const User = model("User", UserSchema);
export default User;
//# sourceMappingURL=user.model.js.map