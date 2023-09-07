import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";
import { passwordRegexp } from "../constants/user-constants.js";

const registerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  password: Joi.string().pattern(passwordRegexp).required().messages({
    'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Invalid email format. Please enter a valid email address.It must contain the symbol @.',
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().pattern(passwordRegexp).required().messages({
    'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Invalid email format. Please enter a valid email address.It must contain the symbol @.',
  }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(6),
  avatarURL: Joi.string(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Invalid email format. Please enter a valid email address.It must contain the symbol @.',
  }),
});

export default {
  registerSchema,
  loginSchema,
  updateSchema,
  userEmailSchema,
};
