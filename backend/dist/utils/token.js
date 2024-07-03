import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized");
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
        res.locals.jwtData = decodedToken;
        return next();
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=token.js.map