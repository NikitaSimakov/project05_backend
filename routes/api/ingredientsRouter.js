import express from "express";
import cocktailsController from "../../controllers/cocktails-controller.js";
import ingredientsController from "../../controllers/ingredients-controller.js";
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
  ingredientsController.getIngredientsList
);

export default ingredientsRouter;
