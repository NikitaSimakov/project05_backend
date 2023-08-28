import Cocktails from "../models/cocktails.js";

import { HttpError } from "./index.js";

const getCocktails = async (filter, pageNumber, pageSize) => {
  const cocktails = await Cocktails.find(filter)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  if (!cocktails) {
    throw HttpError(401, "Recipes not found");
  }

  const totalCount = await Cocktails.countDocuments(filter);
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    cocktails,
    totalPages,
    totalCount,
  };
};

export default getCocktails;
