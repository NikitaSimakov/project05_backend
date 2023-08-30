import express from "express";

import ingedientsListController from "../../controllers/ingedientsList-controller.js";

import { authenticate } from "../../middlewares/index.js";

const ingredientsRouter = express.Router();

ingredientsRouter.get("/list", authenticate, ingedientsListController.getIngredientsList);

export default ingredientsRouter;