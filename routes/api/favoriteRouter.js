import express from "express";
import favoriteControllers from "../../controllers/favorites-controllers.js";
import { authenticate, validateBody } from "../../middlewares/index.js";
import addFavoriteSchema from "../../schemas/favorites-schemas.js";

const favoriteRouter = express.Router();

favoriteRouter.use(authenticate)

favoriteRouter.patch("/", validateBody(addFavoriteSchema), favoriteControllers.addFavoriteController);

favoriteRouter.get("/", favoriteControllers.getFavoritesController);

favoriteRouter.delete("/:recipeId", favoriteControllers.deleteFromFavorites)

export default favoriteRouter