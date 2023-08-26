import express from "express";
import { ctrlWrapper } from "../../decorators/index.js";
import {
  getRecipeById,
  getRecipesForMainPage,
  getRecipesByCategory,
} from "../../controllers/recipes-controller.js";
import { isIdValid } from "../../middlewares/index.js";

export const recipesRouter = express.Router();
recipesRouter.get("/main-page", ctrlWrapper(getRecipesForMainPage));
recipesRouter.get(
  "/:id([a-z0-9_-]{24})",
  isIdValid,
  ctrlWrapper(getRecipeById)
);
recipesRouter.get("/:category", ctrlWrapper(getRecipesByCategory));
