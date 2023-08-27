import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    // drink: { type: String },
    // category: { type: String },
    // alcoholic: { type: String },
    // glass: { type: String },
    // instructions: { type: String },
    // drinkThumb: { type: String },
    // ingredients: { type: Array },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false }
);

export const Recipe = model("cocktail", recipeSchema);
