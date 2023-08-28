import HttpError from "../helpers/HttpError.js";
import cloudinary from "../helpers/cloudinary.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { OwnRecipe } from "../models/ownRecipes.js";
import fs from "fs/promises"



const addRecipeControllers = async (req, res, next) => {
	let drinkThumb = "";
	if (req.file) {
		const { path: oldPath } = req.file;

		const { url: recipeUrl } = await cloudinary.uploader.upload(oldPath, {
			folder: "ownRecipesPhoto",
			transformation: [{ width: 700, height: 700, crop: "fill" }],
		});
		drinkThumb = recipeUrl;

		await fs.unlink(oldPath);
	}

	const { _id: creatorId } = req.user;

	const recipe = await OwnRecipe.create({ ...req.body, creatorId, drinkThumb })
	res.status(201).json(recipe)
}

const getRecipesByUserIdController = async (req, res) => {
	const { _id: creatorId } = req.user;
	const recipes = await OwnRecipe.find({ creatorId })
	res.status(200).json(recipes)
}

const deleteOwnRecipeById = async (req, res, next) => {
	const { recipeId: id } = req.params;
	const recipe = await OwnRecipe.findById(id)
	const userId = req.user._id.toString()

	if (!recipe) {
		return next(HttpError(404, `You haven't recipe with id: ${id}`))
	}
	const { creatorId } = recipe;
	if (userId !== creatorId) {
		return next(HttpError(403, `You haven't permission for delete recipe with id: ${id}`))
	}
	await OwnRecipe.findByIdAndDelete(id)

	res.status(200).json({ "message": "Deleted" })
}


export default {
	addRecipeControllers: ctrlWrapper(addRecipeControllers),
	getRecipesByUserIdController: ctrlWrapper(getRecipesByUserIdController),
	deleteOwnRecipeById: ctrlWrapper(deleteOwnRecipeById)
}