import { Schema, model } from "mongoose";

const ingredientsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Ingredient = model("ingredient", ingredientsSchema);

export default Ingredient;
