import express from "express";

import ingedientsListController from "../../controllers/ingedientsList-controller.js";

// import { authenticate } from "../../middlewares/index.js";

const ingredientsRouter = express.Router();

ingredientsRouter.get("/list",  ingedientsListController.getIngredientsList);
// authenticate,
export default ingredientsRouter;