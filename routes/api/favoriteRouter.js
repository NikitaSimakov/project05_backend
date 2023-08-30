import express from "express";
import favoriteControllers from "../../controllers/favorites-controllers.js";
import { authenticate, isValidOwnRecipeId } from "../../middlewares/index.js";

const favoriteRouter = express.Router();

favoriteRouter.use(authenticate)

favoriteRouter.patch("/:recipeId", isValidOwnRecipeId, favoriteControllers.addFavoriteController);

favoriteRouter.get("/", favoriteControllers.getFavoritesController);

favoriteRouter.delete("/:recipeId", isValidOwnRecipeId, favoriteControllers.deleteFromFavorites);



export default favoriteRouter