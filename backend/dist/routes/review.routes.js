import { Router } from "express";
import { addProductReview, addUserReview, getProductReviews, getUserReviews, } from "../controllers/review.controllers.js";
const reviewRoutes = Router();
reviewRoutes.post("/add", addProductReview);
reviewRoutes.post("/add-user", addUserReview);
reviewRoutes.post("/get-reviews", getProductReviews);
reviewRoutes.post("/get-user-reviews", getUserReviews);
export default reviewRoutes;
//# sourceMappingURL=review.routes.js.map