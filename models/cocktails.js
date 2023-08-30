import { Schema, model } from "mongoose";

const ingredientSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const cocktailsSchema = new Schema(
  {
    drink: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: [ingredientSchema],
  },
  { versionKey: false, timestamps: true }
);

const Cocktails = model("cocktails", cocktailsSchema);

export default Cocktails;
