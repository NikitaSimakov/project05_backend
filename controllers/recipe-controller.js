import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Recipe } from "../models/recipe.js";


const addRecipeControllers = async (req, res, next) => {
	const { _id: creatorId } = req.user;
	const { name } = req.body

	const recipeIsSameNameInBase = await Recipe.findOne({ name })
	console.log(recipeIsSameNameInBase);
	if (recipeIsSameNameInBase) {
		return next(HttpError(409, `You already have recipe with name: ${name}`))
	}

	const recipe = await Recipe.create({ ...req.body, creatorId })
	res.status(201).json(recipe)
}

const getRecipesByUserIdController = async (req, res) => {
	const { _id: creatorId } = req.user;
	const recipes = await Recipe.find({ creatorId })
	res.status(201).json(recipes)
}

const deleteOwnRecipeById = async (req, res, next) => {
	const { recipeId: id } = req.params;
	const deletedRecipe = await Recipe.findByIdAndRemove(id)
	if (!deletedRecipe) {
		return next(HttpError(404, `You haven't recipe with id: ${id}`))
	}
	res.json(deletedRecipe)
}


export default {
	addRecipeControllers: ctrlWrapper(addRecipeControllers),
	getRecipesByUserIdController: ctrlWrapper(getRecipesByUserIdController),
	deleteOwnRecipeById: ctrlWrapper(deleteOwnRecipeById)
}