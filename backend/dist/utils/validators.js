import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    };
};
export const SignUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("username").optional(),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password is required, at least 6 characters"),
];
export const LoginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password is required, at least 6 characters"),
];
export const CreateProductValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("images").notEmpty().withMessage("Images are required"),
];
//# sourceMappingURL=validators.js.map