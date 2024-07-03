import { Router } from "express";
import {
  checkIfUserExists,
  editUser,
  followUser,
  getAllUsers,
  getPopularUsers,
  getSearchResults,
  getSiteDetails,
  getUserById,
  loginUser,
  signupUser,
  unfollowUser,
  verifyUser,
  verifyUserIfAdmin,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/token.js";
import {
  LoginValidator,
  SignUpValidator,
  validate,
} from "../utils/validators.js";

const userRoutes = Router();

userRoutes.post("/signup", validate(SignUpValidator), signupUser);
userRoutes.post("/login", validate(LoginValidator), loginUser);
userRoutes.get("/auth-status", verifyUser);
userRoutes.post("/user-exists", checkIfUserExists);
userRoutes.post("/get-user", getUserById);
userRoutes.put("/follow-user", verifyToken, followUser);
userRoutes.put("/unfollow-user", verifyToken, unfollowUser);
userRoutes.put("/edit-user-info", verifyToken, editUser);
userRoutes.post("/get-popular-users", getPopularUsers);
userRoutes.post("/get-search-results", getSearchResults);
userRoutes.get("/get-all-users", verifyToken, verifyUserIfAdmin, getAllUsers);
userRoutes.get(
  "/get-site-details",
  verifyToken,
  verifyUserIfAdmin,
  getSiteDetails
);

export default userRoutes;
