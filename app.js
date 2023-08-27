import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/api/authRouter.js";
import ownRecipeRouter from "./routes/api/ownRecipe.js";
import { recipesRouter } from "./routes/api/recipesRouter.js";
import { glassRouter } from "./routes/api/glassesRouter.js";

export const app = express();
dotenv.config();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/recipe", ownRecipeRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/glass", glassRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});


app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
	console.log("Test");
	console.log("Test");
});
