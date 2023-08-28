import express from "express";

import authController from "../../controllers/auth-controller.js";

import userSchemas from "../../schemas/user-schemas.js";

import { validateBody, authenticate, upload } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchemas.registerSchema, "Incorrectly filled fields"), authController.register);

authRouter.post("/login", validateBody(userSchemas.loginSchema, "Incorrectly filled fields"), authController.logIn);

authRouter.get("/:id", authenticate, authController.getUser);

authRouter.patch("/update", authenticate, upload.single("avatar"), validateBody(userSchemas.updateSchema, "Sorry, update failed your profile"), authController.updateUser);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/subscribe", authenticate, validateBody(userSchemas.userEmailSchema, "Invalid email address"), authController.subscribe);

export default authRouter;