import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model.js";
import User from "../models/user.model.js";
import Review from "../models/review.model.js";

export async function createProduct(req: Request, res: Response) {
  try {
    const { userId, name, description, price, images } = req.body;

    if (!name || !userId || !description || !price || images.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Product.create({
      name,
      userId,
      description,
      price,
      images,
    });

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserProducts(req: Request, res: Response) {
  try {
    const { userId, category, onSale, search } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let userProducts;

    if (category) {
      switch (category) {
        case "Best Selling": {
          if (search) {
            userProducts = await Product.find({
              userId,
              name: { $regex: search, $options: "i" },
            });
          } else {
            userProducts = await Product.find({
              userId,
            });
          }

          break;
        }

        case "Newest": {
          if (search) {
            userProducts = await Product.find({
              userId,
              name: { $regex: search, $options: "i" },
            }).sort({ createdAt: -1 });
          } else {
            userProducts = await Product.find({
              userId,
            }).sort({ createdAt: -1 });
          }

          break;
        }

        case "Price: Low - High": {
          if (search) {
            userProducts = await Product.find({
              userId,
              name: { $regex: search, $options: "i" },
            }).sort({ price: 1 });
          } else {
            userProducts = await Product.find({
              userId,
            }).sort({ price: 1 });
          }

          break;
        }

        case "Price: High - Low": {
          if (search) {
            userProducts = await Product.find({
              userId,
              name: { $regex: search, $options: "i" },
            }).sort({ price: -1 });
          } else {
            userProducts = await Product.find({
              userId,
            }).sort({ price: -1 });
          }

          break;
        }
      }
    } else if (onSale === "true") {
      if (search) {
        userProducts = await Product.find({
          userId,
          name: { $regex: search, $options: "i" },
          isOnSale: true,
        });
      } else {
        userProducts = await Product.find({
          userId,
          isOnSale: true,
        });
      }
    } else {
      if (search) {
        userProducts = await Product.find({
          userId,
          name: { $regex: search, $options: "i" },
        });
      } else {
        userProducts = await Product.find({
          userId,
        }).sort({ createdAt: -1 });
      }
    }

    return res.status(201).json({ message: "OK", data: userProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviewsLength = await Review.countDocuments({ productId });

    return res
      .status(201)
      .json({ message: "OK", data: product, reviewsLength });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function toggleFavorite(req: Request, res: Response) {
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

    if (user.favorites.includes(productId)) {
      await User.findByIdAndUpdate(userId, {
        $pull: { favorites: productId },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { favorites: productId },
      });
    }

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "User or product not found" });
    }

    await Product.findByIdAndDelete(product._id);

    const users = await User.find();

    for (let i = 0; i < users.length; i++) {
      await User.findByIdAndUpdate(users[i]._id, {
        $pull: { cartItems: productId },
      });

      await User.findByIdAndUpdate(users[i]._id, {
        $pull: { favorites: productId },
      });
    }

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function editProduct(req: Request, res: Response) {
  try {
    const {
      productId,
      name,
      description,
      price,
      isOnSale,
      salePrice,
      isOutOfStock,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "User or product not found" });
    }

    await Product.findByIdAndUpdate(product._id, {
      name: name ? name : product.name,
      description: description ? description : product.description,
      price: price ? price : product.price,
      isOnSale: isOnSale,
      salePrice: salePrice ? salePrice : product.salePrice,
      isOutOfStock: isOutOfStock,
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMostRatedProducts(req: Request, res: Response) {
  try {
    const products = await Product.find({})
      .sort({ averageRating: -1 })
      .limit(5);

    return res.status(200).json({ message: "OK", data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOnSaleProducts(req: Request, res: Response) {
  try {
    const products = await Product.find({ isOnSale: true });

    return res.status(200).json({ message: "OK", data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getRecommendedProducts(req: Request, res: Response) {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const firstLetterOfProductName = product.name.charAt(0);

    const recommendedProducts = await Product.find({
      name: { $regex: firstLetterOfProductName, $options: "i" },
      _id: { $ne: productId },
    }).limit(10);

    return res.status(200).json({ message: "OK", data: recommendedProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function editProductName(req: Request, res: Response) {
  try {
    const { productId, name } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name === product.name || !name) {
      return res.status(400).json({ message: "Name is required" });
    }

    await Product.findByIdAndUpdate(product._id, {
      name,
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function editProductDescription(req: Request, res: Response) {
  try {
    const { productId, description } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (description === product.description || !description) {
      return res.status(400).json({ message: "Description is required" });
    }

    await Product.findByIdAndUpdate(product._id, {
      description,
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function editProductPrice(req: Request, res: Response) {
  try {
    const { productId, price } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (price === product.price || !price) {
      return res.status(400).json({ message: "Price is required" });
    }

    await Product.findByIdAndUpdate(product._id, {
      price,
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
