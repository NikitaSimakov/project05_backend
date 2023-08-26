import express from "express";
import { getCategories } from "../../controllers/categories-controller.js";
import { ctrlWrapper } from "../../decorators/index.js";

export const categoriesRouter = express.Router();

categoriesRouter.get("/", ctrlWrapper(getCategories));
