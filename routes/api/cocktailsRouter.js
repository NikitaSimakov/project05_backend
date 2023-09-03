import express from "express";

import cocktailsController from"../../controllers/cocktails-controller.js";

import { authenticate } from "../../middlewares/index.js";

const cocktailsRouter = express.Router();

cocktailsRouter.get("/search", authenticate, cocktailsController.getRecipesBySearch);

export default cocktailsRouter;