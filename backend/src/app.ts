import express from "express";
import { config } from "dotenv";
import { ConnectToDatabase } from "./db/connection.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cartRoutes from "./routes/cart.routes.js";

config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://shop-ecommerce-xi.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

ConnectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port 8080 & connected to MongoDB");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/cart", cartRoutes);
