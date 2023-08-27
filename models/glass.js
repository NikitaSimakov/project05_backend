import { Schema, model } from "mongoose";
// import Joi from "joi";
// import { handleMongooseError } from "../helpers/handleMongooseError.js";

const glassSchema = new Schema(
  {
    // glass: { type: String },
    // email: { type: String },
    // phone: { type: String },
    // favorite: { type: Boolean, default: false },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false }
);

// export const schemaAdd = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.bool(),
// });

// export const schemaUpdate = Joi.object({
//   name: Joi.string(),
//   email: Joi.string(),
//   phone: Joi.string(),
//   favorite: Joi.bool(),
// }).min(1);

// export const favoriteSchema = Joi.object({
//   glass: Joi.string(),
// });

// contactSchema.post("save", handleMongooseError);

export const Glass = model("glass", glassSchema);
