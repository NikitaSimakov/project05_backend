import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Recipe } from "../models/recipes.js";

const addFavoriteController = async (req, res) => {
	const { id } = req.body
	const userId = req.user._id.toString()

	const user = await Recipe.findById(id)
	if (user.usersId.includes(userId)) {
		throw HttpError(400, `You added recipe with id: ${id} to favorite!`)
	}

	const updatedRecipe = await Recipe.findByIdAndUpdate(id, {
		$push: { usersId: userId }
	}, { new: true })
	res.status(201).json(updatedRecipe)
}

const getFavoritesController = async (req, res) => {
	const userId = req.user._id.toString()

	const favoriteRecipes = await Recipe.find({ usersId: userId })

	res.json(favoriteRecipes)
}

const deleteFromFavorites = async (req, res) => {
	const { recipeId } = req.params
	const userId = req.user._id.toString()

	await Recipe.findByIdAndUpdate(recipeId, {
		$pull: { usersId: userId }
	})
	res.status(200).json({ "message": "Deleted" })
}

export default {
	addFavoriteController: ctrlWrapper(addFavoriteController),
	getFavoritesController: ctrlWrapper(getFavoritesController),
	deleteFromFavorites: ctrlWrapper(deleteFromFavorites)
}