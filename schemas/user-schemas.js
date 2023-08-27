import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const registerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(6),
  avatarURL: Joi.string(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export default {
  registerSchema,
  loginSchema,
  updateSchema,
  userEmailSchema,
};
