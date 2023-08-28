import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    drink: { type: String },
  },
  { versionKey: false }
);

const Recipe = model("cocktail", recipeSchema);
export default Recipe;
