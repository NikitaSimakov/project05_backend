import { ctrlWrapper, getCocktails } from "../helpers/index.js";

const getRecipesBySearch = async (req, res) => {
  const { keyword } = req.query;
    const filter = { "ingredients.title": { $regex: new RegExp(keyword, "i") } };
    const { pageNumber, pageSize } = req.query;
    const result = await getCocktails(filter, pageNumber, pageSize);
    res.status(200).json({
      ...result,
      currentPage: pageNumber,
    });
};

export default {
  getRecipesBySearch: ctrlWrapper(getRecipesBySearch),
};
