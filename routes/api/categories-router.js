import express from "express";
import { getCategories } from "../../controllers/categories-controller.js";
import { ctrlWrapper } from "../../decorators/ctrlWrapper.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", ctrlWrapper(getCategories));
