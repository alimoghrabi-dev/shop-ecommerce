import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePic: string;
  coverPic: string;
  bio: string;
  password: string;
  isAdmin: boolean;
  websiteUrl: string;
  phoneNumber: string;
  rating: number;
  _doc: {
    name: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
  };
  followings: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  favorites: Schema.Types.ObjectId[];
  categories: [
    {
      title: string;
    }
  ];
  reviews: Schema.Types.ObjectId[];
  cartItems: Schema.Types.ObjectId[];
  averageRating: number;
}

const UserSchema = new Schema<IUser>({
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
