import express from "express";
import favoriteControllers from "../../controllers/favorites-controllers.js";
import { authenticate } from "../../middlewares/index.js";

const popularRecipeRouter = express.Router();

popularRecipeRouter.use(authenticate)

popularRecipeRouter.get("/", favoriteControllers.getTopCocktails)

export default popularRecipeRouter