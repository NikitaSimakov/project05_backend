import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    caregory: { type: String },
  },
  { versionKey: false }
);

export const Category = model("category", categorySchema);
