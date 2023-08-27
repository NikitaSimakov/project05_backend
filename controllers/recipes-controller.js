import HttpError from "../helpers/HttpError.js";
import { Recipe } from "../models/recipes.js";

export const getRecipeById = async (req, res) => {
  const { id: _id } = req.params;
  const recipe = await Recipe.findById(_id);
  console.log("getbyid", _id);
  if (!recipe) throw HttpError(404, `Recipe with Id: ${_id} not found`);
  res.json(recipe);
};

export const getRecipesForMainPage = async (req, res) => {
  const random = Math.floor(Math.random() * 20);
  const queryForCategory = async (category) => {
    return await Recipe.find(
      { category },
      "drink drinkThumb ingredients category "
    )
      .limit(3)
      .skip(random);
  };
  const response = {
    "Odinary Drink": await queryForCategory("Ordinary Drink"),
    Cocktail: await queryForCategory("Cocktail"),
    Shake: await queryForCategory("Shake"),
    "Other/Unknown": await queryForCategory("Other/Unknown"),
  };
  res.json(response);
};

export const getRecipesByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;

  const skip = (page - 1) * limit;

  const recipesByCategory = await Recipe.find({ category }, "", {
    skip,
    limit,
  });
  if (!recipesByCategory[0])
    throw HttpError(404, `Category ${category} not found`);
  res.json(recipesByCategory);
};
