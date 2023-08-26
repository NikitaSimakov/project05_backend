import { Category } from "../models/category.js";
import { Recipe } from "../models/recipes.js";

export const getRecipeById = async (req, res) => {
  const { id: _id } = req.params;
  const recipe = await Recipe.findById(_id);
  console.log("getbyid", _id);
  res.json(recipe);
};

export const getRecipesForMainPage = async (req, res) => {
  const random = Math.floor(Math.random() * 20);
  const queryForCategory = async (category) => {
    return await Recipe.find({ category }, "drink drinkThumb category")
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

// export const getRecipesByCategory = async (req, res) => {
//   const { category: id } = req.params;
//   const { page = 1 } = req.query;
//   const limit = 3;
//   const skip = (page - 1) * limit;
//   const newCat = await Category.findById(id);
//   console.log(newCat);
//   // let category =
//   //   lowerCaseCategory[0].toUpperCase() + lowerCaseCategory.slice(1);
//   const recipesByCategory = await Recipe.find(
//     { category: newCat.category },
//     "",
//     {
//       skip,
//       limit,
//     }
//   );
//   res.json(recipesByCategory);
// };

export const getRecipesByCategory = async (req, res, next) => {
  const { category } = req.params;
  // const obj = await Category.findById(id);
  // const [_, __, { category }] = Object.values(obj);
  console.log("cat", category);
  const recipesByCategory = await Recipe.find({ category });
  res.json(recipesByCategory);
};
