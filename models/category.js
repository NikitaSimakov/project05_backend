import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    category: { type: String },
  },
  { versionKey: false }
);

const Category = model("category", categorySchema);

export default Category;
