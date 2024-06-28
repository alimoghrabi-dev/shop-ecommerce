import { Request, Response } from "express";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export async function addItemFromCart(req: Request, res: Response) {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);

    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }

    if (user.cartItems.includes(productId)) {
      await User.findByIdAndUpdate(userId, {
        $pull: { cartItems: productId },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { cartItems: productId },
      });
    }

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeFromCart(req: Request, res: Response) {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);

    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { cartItems: productId },
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCartTotal(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let total = 0;

    for (let i = 0; i < user.cartItems.length; i++) {
      const product = await Product.findById(user.cartItems[i]);
      if (product) {
        total += product.isOnSale ? product.salePrice : product.price;
      }
    }

    return res.status(200).json({ message: "OK", total });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
