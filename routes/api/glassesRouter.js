import express from "express";
import { getGlasses } from "../../controllers/glasses-controller.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { authenticate } from "../../middlewares/index.js";

export const glassRouter = express.Router();

glassRouter.get("/", authenticate, ctrlWrapper(getGlasses));
