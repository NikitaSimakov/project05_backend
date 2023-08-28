import express from "express"
// import authenticate from "../../middlewares/authenticate.js"
import recipeControllers from "../../controllers/recipe-controller.js"
import { isEmptyBody, isValidOwnRecipeId, upload, validateBody } from "../../middlewares/index.js"
import recipeSchemas from "../../schemas/recipe-schemas.js"

const ownRecipeRouter = express.Router()

// ownRecipeRouter.use(authenticate)

ownRecipeRouter.post("/", upload.single("recipePhoto"), isEmptyBody, validateBody(recipeSchemas.addRecipeSchema), recipeControllers.addRecipeControllers) //add new recipe

ownRecipeRouter.get("/", recipeControllers.getRecipesByUserIdController) // get all recipe

ownRecipeRouter.delete("/:recipeId", recipeControllers.deleteOwnRecipeById) //delete recipe

export default ownRecipeRouter