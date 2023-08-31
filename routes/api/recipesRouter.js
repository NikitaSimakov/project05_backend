import express from "express";
import { ctrlWrapper } from "../../decorators/index.js";
import {
  getRecipeById,
  getRecipesForMainPage,
  getRecipesByCategory,
} from "../../controllers/recipes-controller.js";
import {  isIdValid, authenticate } from "../../middlewares/index.js";

import { getCategories } from "../../controllers/categories-controller.js";

export const recipesRouter = express.Router();

recipesRouter.get(
  "/main-page",
  authenticate,
  ctrlWrapper(getRecipesForMainPage)
);

recipesRouter.get("/category-list",  ctrlWrapper(getCategories));
// authenticate,
recipesRouter.get(
  "/:id([a-z0-9_-]{24})",
  authenticate,
  isIdValid,
  ctrlWrapper(getRecipeById)
);

recipesRouter.get(
  "/:category*",
  authenticate,
  ctrlWrapper(getRecipesByCategory)
);
