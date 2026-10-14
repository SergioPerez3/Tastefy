import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";
import userRoutes from "./routes/user.routes.js";

import uploadRoutes from "./routes/upload.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "RecipeHub API 🍳" }));

app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/users", userRoutes);

app.use("/upload", uploadRoutes);

export default app;
