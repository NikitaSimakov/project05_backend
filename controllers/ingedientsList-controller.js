import { ctrlWrapper } from "../helpers/index.js";
import Ingredient from "../models/ingredient.js";

const getIngredientsList = async (req, res) => {
  const ingredients = await Ingredient.find({});
  res.json(ingredients);
};

export default {
  getIngredientsList: ctrlWrapper(getIngredientsList),
};
