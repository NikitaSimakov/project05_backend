import { Category } from "../models/category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ category: 1 });
  //Пример запроса за рандомными документами await Category.aggregate([{ $sample: { size: 3 } }]);

  res.json(categories);
};
