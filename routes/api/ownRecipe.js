import express from "express"
import authenticate from "../../middlewares/authenticate.js"
import recipeControllers from "../../controllers/recipe-controller.js"
import { isEmptyBody, isValidOwnRecipeId, validateBody } from "../../middlewares/index.js"
import recipeSchemas from "../../schemas/recipe-schemas.js"

const recipeRouter = express.Router()

recipeRouter.use(authenticate)

recipeRouter.post("/", isEmptyBody, validateBody(recipeSchemas.addRecipeSchema), recipeControllers.addRecipeControllers) //add new recipe

recipeRouter.get("/", recipeControllers.getRecipesByUserIdController) // get all recipe

recipeRouter.delete("/:recipeId", isValidOwnRecipeId, recipeControllers.deleteOwnRecipeById) //delete recipe

export default recipeRouter