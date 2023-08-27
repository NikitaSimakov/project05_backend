import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidOwnRecipeId = (req, res, next) => {
	console.log(req.params.recipeId);
	const { recipeId: id } = req.params;
	if (!isValidObjectId(id)) {
		return next(HttpError(404, `${id} not valid Id`))
	}
	next()
}

export default isValidOwnRecipeId;