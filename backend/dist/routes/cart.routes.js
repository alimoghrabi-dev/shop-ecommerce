import { Router } from "express";
import { addItemFromCart, getCartTotal, removeFromCart, } from "../controllers/cart.controllers.js";
import { getProductById } from "../controllers/product.controllers.js";
const cartRoutes = Router();
cartRoutes.post("/add-remove", addItemFromCart);
cartRoutes.post("/get-product", getProductById);
cartRoutes.put("/remove-product", removeFromCart);
cartRoutes.post("/get-cart-total", getCartTotal);
export default cartRoutes;
//# sourceMappingURL=cart.routes.js.map