import Cocktails from "../models/cocktails.js";
import Ingredient from "../models/ingredient.js";

import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getIngredientsList = async (req, res) => {
  const ingredients = await Ingredient.find({});
  res.json(ingredients);
};

const getRecipesByIngredients = async (req, res) => {
  const { keyword } = req.query;
  const { pageNumber } = parseInt(req.query) || 1;
  const { pageSize } = parseInt(req.query) || 9;

  const regex = new RegExp(keyword, "i");

  const cocktails = await Cocktails.find({
    $or: [
      { drink: { $regex: regex } },
      { "ingredients.title": { $regex: regex } },
    ],
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  if (!cocktails) {
    throw HttpError(401, "Recipes not found");
  }

  const totalCount = await Cocktails.countDocuments({
    $or: [
      { drink: { $regex: regex } },
      { "ingredients.title": { $regex: regex } },
    ],
  });
  const totalPages = Math.ceil(totalCount / pageSize);

  res.status(200).json({
    cocktails,
    totalPages,
    currentPage: pageNumber,
    totalCount,
  });
};

export default {
  getRecipesBySearch: ctrlWrapper(getRecipesByIngredients),
  getIngredientsList: ctrlWrapper(getIngredientsList),
};
