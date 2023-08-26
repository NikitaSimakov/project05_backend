import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { categoriesRouter } from "./routes/api/categories-router.js";
import { recipesRouter } from "./routes/api/recipes-router.js";

export const app = express();
dotenv.config();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/recipes/category-list", categoriesRouter);
app.use("/api/recipes", recipesRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
