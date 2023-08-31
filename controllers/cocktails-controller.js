import { ctrlWrapper, getCocktails } from "../helpers/index.js";

const getRecipesBySearch = async (req, res) => {
  const { drink, category, title } = req.query;
  const { pageNumber, pageSize } = req.query;

    const filter = {
      $and: [
        { drink: { $regex: new RegExp(drink, "i") } },
        { category: { $regex: new RegExp(category, "i") } },
        { "ingredients.title": { $regex: new RegExp(title, "i") } },
      ],
    };
   
    const result = await getCocktails(filter, pageNumber, pageSize);
    res.status(200).json({
      ...result,
      currentPage: pageNumber,
    });
};

export default {
  getRecipesBySearch: ctrlWrapper(getRecipesBySearch),
};