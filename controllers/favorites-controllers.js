import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Recipe from "../models/recipes.js";

const addFavoriteController = async (req, res) => {
	const { recipeId } = req.params
	const userId = req.user._id.toString()

	const user = await Recipe.findById(recipeId)
	if (user.usersId.includes(userId)) {
		throw HttpError(400, `You added recipe with id: ${recipeId} to favorite!`)
	}

	const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
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

const getTopCocktails = async (req, res) => {
	const pipeline = [
		{
			'$match': {
				"usersId": { $exists: true }
			}
		},
		{
			$project: {
				"drink": 1,
				"instructions": 1,
				"drinkThumb": 1,
				"usersId": 1,
				"users_count": { $size: "$usersId" }
			}
		},
		{ $sort: { "users_count": -1 } }, {
			'$limit': 4
		}
	]

	const result = await Recipe.aggregate(pipeline);
	res.json(result)
}

export default {
	addFavoriteController: ctrlWrapper(addFavoriteController),
	getFavoritesController: ctrlWrapper(getFavoritesController),
	deleteFromFavorites: ctrlWrapper(deleteFromFavorites),
	getTopCocktails: ctrlWrapper(getTopCocktails)
}