import jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token || token.trim() === "") {
            return res.status(401).send("Unauthorized");
        }
        return new Promise((resolve, reject) => {
            return jwt.verify(token, process.env.JWT_SECRET, (_error, success) => {
                if (_error) {
                    reject(_error.message);
                    return res.status(401).send("Unauthorized");
                }
                else {
                    console.log("token verified");
                    resolve();
                    res.locals.jwtData = success;
                    return next();
                }
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=token.js.map