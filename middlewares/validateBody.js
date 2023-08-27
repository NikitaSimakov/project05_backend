import { HttpError } from "../helpers/index.js";

const validateBody = (schema, message) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, message));
    }
    next();
  };
  return func;
};

export default validateBody;
