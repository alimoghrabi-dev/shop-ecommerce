import { Request, Response } from "express";
import Review, { IReview } from "../models/review.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export async function addProductReview(req: Request, res: Response) {
  try {
    const { userId, productId, content, rating } = req.body;

    if (!userId || !productId || !content || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Review.create({
      userId,
      productId,
      content,
      rating,
      isUser: false,
    });

    const productReviews = await Review.find({ productId, isUser: false });

    const totalRatings = productReviews.length;
    const sumOfRatings = productReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

    await Product.findByIdAndUpdate(product._id, {
      averageRating: averageRating,
    });

    return res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductReviews(req: Request, res: Response) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reviews = await Review.find({ productId, isUser: false });

    return res.status(201).json({ message: "OK", data: reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function addUserReview(req: Request, res: Response) {
  try {
    const { userId, content, rating, userToAddToId } = req.body;

    if (!userId || !content || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const review = await Review.create({
      userId,
      content,
      rating,
      isUser: true,
    });

    await User.findByIdAndUpdate(userToAddToId, {
      $push: { reviews: review._id },
    });

    const userToAddTo = await User.findById(userToAddToId);

    let userReviews: IReview[] = [];

    const reviews = await Review.find({ isUser: true });

    reviews.map((review: any) => {
      if (userToAddTo?.reviews.includes(review._id)) {
        userReviews.push(review);
      }
    });

    const totalRatings = userReviews.length;
    const sumOfRatings = userReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

    await User.findByIdAndUpdate(userToAddTo?._id, {
      averageRating: averageRating,
    });

    return res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserReviews(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);

    let userReviews: IReview[] = [];

    const reviews = await Review.find({ isUser: true });

    reviews.map((review: any) => {
      if (user?.reviews.includes(review._id)) {
        userReviews.push(review);
      }
    });

    return res.status(201).json({ message: "OK", data: userReviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
