import express from "express";
import cocktailsController from "../../controllers/cocktails-controller.js";
import ingedientsListController from "../../controllers/ingedientsList-controller.js";
import { authenticate } from "../../middlewares/index.js";

const ingredientsRouter = express.Router();
ingredientsRouter.get(
  "/ingredients",
  authenticate,
  cocktailsController.getRecipesBySearch
);

ingredientsRouter.get(
  "/ingredients/list",
  authenticate,
  ingedientsListController.getIngredientsList
);

export default ingredientsRouter;
