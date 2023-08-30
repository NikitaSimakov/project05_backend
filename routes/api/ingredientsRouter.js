import express from "express";

import cocktailsController from "../../controllers/cocktails-controller.js";

import { authenticate } from "../../middlewares/index.js";

const ingredientsRouter = express.Router();

ingredientsRouter.get("/ingredients", authenticate, cocktailsController.getRecipesBySearch);

export default ingredientsRouter;