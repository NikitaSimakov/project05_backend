import express from "express";
import favoriteControllers from "../../controllers/favorites-controllers.js";
import { authenticate } from "../../middlewares/index.js";

const favoriteRouter = express.Router();

favoriteRouter.use(authenticate)

favoriteRouter.patch("/:recipeId", favoriteControllers.addFavoriteController);

favoriteRouter.get("/", favoriteControllers.getFavoritesController);

favoriteRouter.delete("/:recipeId", favoriteControllers.deleteFromFavorites);



export default favoriteRouter