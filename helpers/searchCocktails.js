import Recipe from "../models/recipes.js";

import { HttpError } from "./index.js";

const getCocktails = async (filter, pageNumber, pageSize) => {
  const cocktails = await Recipe.find(filter)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  if (!cocktails) {
    throw HttpError(401, "Recipes not found");
  }

  const totalCount = await Recipe.countDocuments(filter);
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    cocktails,
    totalPages,
    totalCount,
  };
};

export default getCocktails;