import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn,
  });

  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies[`${COOKIE_NAME}`];

    if (!token || token.trim() === "") {
      return res.status(401).send("Unauthorized");
    }

    return new Promise<void>((resolve, reject) => {
      return jwt.verify(
        token,
        process.env.JWT_SECRET!,
        (_error: any, success: any) => {
          if (_error) {
            reject(_error.message);
            return res.status(401).send("Unauthorized");
          } else {
            console.log("token verified");
            resolve();
            res.locals.jwtData = success;
            return next();
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};
