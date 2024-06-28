export type RegisteredUser = {
  name: string;
  username?: string | undefined;
  email: string;
  password: string;
};

export type User = {
  _id?: string;
  id: string;
  name: string;
  username?: string | undefined;
  email: string;
  isAdmin: boolean;
  profilePic: string | undefined;
  phoneNumber?: string | undefined;
};

export type SearchedUser = {
  _id: string;
  name: string;
  profilePic: string | undefined;
  averageRating: number;
  reviews: Review[];
};

export type EditUser = {
  userId: string;
  name?: string;
  username?: string;
  profilePic?: string;
  coverPic?: string;
  bio?: string;
  websiteUrl?: string;
  phoneNumber?: string;
};

export type CreateProduct = {
  name: string;
  userId: string | undefined;
  description: string;
  price: number;
  images: string[];
};

export type Product = {
  _id: string;
  name: string;
  userId: string | undefined;
  description: string;
  price: number;
  images: string[];
  averageRating: number;
  isOnSale: boolean;
  salePrice: number;
  isOutOfStock: boolean;
};

export type Review = {
  _id: string;
  content: string;
  userId: string | undefined;
  productId: string | undefined;
  rating: number;
  createdAt: Date;
};

export type Recommended = {
  _id: string;
  name: string;
  coverPic: string | undefined;
  profilePic: string | undefined;
};
