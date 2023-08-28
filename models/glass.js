import { Schema, model } from "mongoose";

const glassSchema = new Schema(
  {
    glass: { type: String },
  },
  { versionKey: false }
);

const Glass = model("glass", glassSchema);

export default Glass;
