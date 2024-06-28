import * as z from "zod";

export const SignUpValidator = z.object({
  name: z.string().min(3, "Name is required"),
  username: z.string().optional(),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignInValidator = z.object({
  email: z.string().email("Email is required"),
  password: z.string().optional(),
});

export const EditUserValidator = z.object({
  name: z.string().min(3, "Name should be at least 3 characters").optional(),
  username: z
    .string()
    .min(3, "Username should be at least 3 characters")
    .optional(),
  bio: z.string().max(200, "Bio should be less than 200 characters").optional(),
  profilePic: z.string().optional(),
  coverImage: z.string().optional(),
  phoneNumber: z.string().optional(),
  websiteUrl: z.string().url("Invalid URL").optional(),
});

export const CreateNewProductValidator = z.object({
  name: z.string().min(3, "Name should be at least 3 characters"),
  description: z
    .string()
    .max(200, "Description should be less than 200 characters"),
  price: z.number().min(1, "Price is required"),
});

export const EditProductValidator = z.object({
  name: z.string().min(3, "Name should be at least 3 characters"),
  description: z
    .string()
    .max(200, "Description should be less than 200 characters"),
  price: z.number().min(1, "Price is required"),
  isOnSale: z.boolean().optional().default(false),
  salePrice: z.number().optional().default(0),
  isOutOfStock: z.boolean().optional().default(false),
});
