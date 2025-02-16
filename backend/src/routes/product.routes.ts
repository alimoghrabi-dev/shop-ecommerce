import { Router } from "express";
import { CreateProductValidator, validate } from "../utils/validators.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  editProductDescription,
  editProductName,
  editProductPrice,
  getMostRatedProducts,
  getOnSaleProducts,
  getProductById,
  getRecommendedProducts,
  getUserProducts,
  toggleFavorite,
} from "../controllers/product.controllers.js";
import { verifyToken } from "../utils/token.js";
import { verifyUserIfAdmin } from "../controllers/user.controllers.js";

const productRoutes = Router();

productRoutes.post("/create", validate(CreateProductValidator), createProduct);
productRoutes.post("/get-products", getUserProducts);
productRoutes.post("/get-product", getProductById);
productRoutes.put("/toggle-favorite", toggleFavorite);
productRoutes.post("/delete-product", deleteProduct);
productRoutes.patch("/edit-product", editProduct);
productRoutes.get("/get-most-rated-products", getMostRatedProducts);
productRoutes.get("/get-onsale-products", getOnSaleProducts);
productRoutes.post("/get-recommended-products", getRecommendedProducts);

productRoutes.put(
  "/admin-edit-name",
  verifyToken,
  verifyUserIfAdmin,
  editProductName
);
productRoutes.put(
  "/admin-edit-description",
  verifyToken,
  verifyUserIfAdmin,
  editProductDescription
);
productRoutes.put(
  "/admin-edit-price",
  verifyToken,
  verifyUserIfAdmin,
  editProductPrice
);

export default productRoutes;
