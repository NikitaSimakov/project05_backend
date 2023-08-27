import express from "express";
import { getGlasses } from "../../controllers/glasses-controller.js";
import { ctrlWrapper } from "../../decorators/index.js";

export const glassRouter = express.Router();

glassRouter.get("/", ctrlWrapper(getGlasses));
