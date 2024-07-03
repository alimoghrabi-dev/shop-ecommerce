import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token.js";
import jwt from "jsonwebtoken";
import Product from "../models/product.model.js";
export async function verifyUser(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized: Token missing");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).send("Unauthorized: Invalid token");
        }
        //@ts-ignore
        const userId = decodedToken.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send("Unauthorized: User not found");
        }
        if (user._id.toString() !== userId) {
            return res.status(401).send("Unauthorized: Permission denied");
        }
        return res.status(201).json({
            message: "OK",
            data: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: "ERROR", cause: error });
    }
}
export async function verifyUserIfAdmin(req, res, next) {
    try {
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send("Unauthorized: User not found");
        }
        if (user._id.toString() !== userId) {
            return res.status(401).send("Unauthorized: Permission denied");
        }
        if (!user.isAdmin) {
            return res.status(401).send("Unauthorized: Permission denied");
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error });
    }
}
export async function signupUser(req, res) {
    try {
        const { name, username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(200).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password || "");
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is invalid" });
        }
        const token = createToken(user._id.toString(), user.email, "7d");
        return res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function checkIfUserExists(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User Exists" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function getUserById(req, res) {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send("User not found");
        }
        const reviewsLength = user?.reviews?.length;
        return res.status(200).json({ message: "OK", data: user, reviewsLength });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function followUser(req, res) {
    try {
        const { currentUserId, followingUserId } = req.body;
        const followedUser = await User.findById(followingUserId);
        const userFollowing = await User.findById(currentUserId);
        if (!followedUser || !userFollowing) {
            return res.status(401).send("User not found");
        }
        if (userFollowing._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }
        await User.findByIdAndUpdate(followingUserId, {
            $push: { followers: currentUserId },
        });
        await User.findByIdAndUpdate(currentUserId, {
            $push: { followings: followingUserId },
        });
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function unfollowUser(req, res) {
    try {
        const { currentUserId, followingUserId } = req.body;
        const unfollowedUser = await User.findById(followingUserId);
        const userUnFollowing = await User.findById(currentUserId);
        if (!unfollowedUser || !userUnFollowing) {
            return res.status(401).send("User not found");
        }
        if (userUnFollowing._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }
        await User.findByIdAndUpdate(followingUserId, {
            $pull: { followers: currentUserId },
        });
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { followings: followingUserId },
        });
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function editUser(req, res) {
    try {
        const { userId, name, username, websiteUrl, phoneNumber, bio, profilePic, coverPic, } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send("User not found");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }
        await User.findByIdAndUpdate(user._id, {
            name: name ? name : user.name,
            username: username ? username : user.username,
            websiteUrl: websiteUrl ? websiteUrl : user.websiteUrl,
            phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
            bio: bio ? bio : user.bio,
            profilePic: profilePic ? profilePic : user.profilePic,
            coverPic: coverPic ? coverPic : user.coverPic,
        });
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function getPopularUsers(req, res) {
    try {
        let users = [];
        users = await User.find({}).sort({ followers: -1 }).limit(5);
        return res.status(200).json({ message: "OK", data: users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function getSearchResults(req, res) {
    try {
        const { search } = req.body;
        const users = await User.find({
            name: { $regex: search, $options: "i" },
        });
        const products = await Product.find({
            name: { $regex: search, $options: "i" },
        });
        return res.status(200).json({ message: "OK", data: { users, products } });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function getAllUsers(req, res) {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user || !user.isAdmin) {
            return res.status(401).send("User not found");
        }
        const users = await User.find({
            _id: { $ne: user._id },
        }).sort({ followers: -1 });
        return res.status(200).json({ message: "OK", data: users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function getSiteDetails(req, res) {
    try {
        const nbOfUsers = await User.find({});
        const nbOfProducts = await Product.find({});
        const activeUsers = await User.find({
            reviews: { $ne: [] },
            followers: { $ne: [] },
            followings: { $ne: [] },
        });
        const products = await Product.find({}, "price");
        const prices = products.map((product) => product.price);
        const averagePrice = prices.reduce((total, price) => total + price, 0) / prices.length;
        return res.status(200).json({
            message: "OK",
            data: {
                nbOfUsers: nbOfUsers.length,
                nbOfProducts: nbOfProducts.length,
                activeUsers: activeUsers.length,
                averagePrice,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
//# sourceMappingURL=user.controllers.js.map