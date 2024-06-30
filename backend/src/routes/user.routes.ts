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
  logoutUser,
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
userRoutes.post("/logout", verifyToken, logoutUser);
userRoutes.post("/auth-status", verifyToken, verifyUser);
userRoutes.post("/user-exists", checkIfUserExists);
userRoutes.post("/get-user", verifyToken, getUserById);
userRoutes.put("/follow-user", verifyToken, followUser);
userRoutes.put("/unfollow-user", verifyToken, unfollowUser);
userRoutes.put("/edit-user-info", verifyToken, editUser);
userRoutes.post("/get-popular-users", getPopularUsers);
userRoutes.post("/get-search-results", getSearchResults);

userRoutes.post("/get-all-users", verifyToken, verifyUserIfAdmin, getAllUsers);
userRoutes.post(
  "/get-site-details",
  verifyToken,
  verifyUserIfAdmin,
  getSiteDetails
);

export default userRoutes;
