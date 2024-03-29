import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";
import fs from "fs/promises";

import User from "../models/user.js";

import {
	HttpError,
	ctrlWrapper,
	cloudinary,
	sendEmail,
} from "../helpers/index.js";

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Provided email already exists");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const md5Hash = crypto.createHash("md5").update(name).digest("hex");

	const gravatarBaseUrl = "//www.gravatar.com/avatar/";
	const size = 200;
	const defaultAvatar = "identicon";
	const avatarURL = `${gravatarBaseUrl}${md5Hash}?s=${size}&d=${defaultAvatar}`;

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
	});

	res.status(201).json({
		name: newUser.name,
		email: newUser.email,
		avatarURL
	});
};

const logIn = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email is wrong");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Password is wrong");
	}

	const payload = {
		id: user.id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3w" });
	await User.findByIdAndUpdate(user._id, { token });

	res.status(200).json({
		token,
		user: {
			email,
		},
	});
};

const getUser = async (req, res) => {
	const user = req.user;

      res.status(200).json({ user });
};

const updateUser = async (req, res) => {
	const { _id } = req.user;
	const { name } = req.body;

	if (name) {
		const updatedUserName = await User.findByIdAndUpdate(_id, { name });

		if (!updatedUserName) {
			return res.status(401).json({ message: "Not authorized" });
		  }

		res.status(200).json({ user: updatedUserName });
	}
	if (req.file) {
		const { path: oldPath } = req.file;

		const { url: avatarURL } = await cloudinary.uploader.upload(oldPath, {
			folder: "avatars",
			transformation: [{ width: 250, height: 250, crop: "fill" }],
		});
		const updatedUserAvatar = await User.findByIdAndUpdate(_id, { avatarURL });

		if (!updatedUserAvatar) {
			return res.status(401).json({ message: "Not authorized" });
		  }

		await fs.unlink(oldPath);
		res.status(200).json({ user: updatedUserAvatar });
	}
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json({
		message: "No Content",
	});
};

const subscribe = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(400, "Missing required field email");
	}

	const subscribeEmail = {
		to: email,
		subject: "Newsletter Subscribe",
		html: `
	<center>
      <div style="background-color: rgba(0, 0, 0, 0.9); color: #ffffff; padding: 20px;">
      <h1>Welcome to Our Newsletter!</h1>
      <p>Thank you for subscribing to our newsletter. Stay tuned for the latest updates and news.</p>
      <p style="font-weight: bold;">Best regards,</p>
      <p>Your Drink Master Team</p>
    </div>
	</center>
    `,
	};

	await sendEmail(subscribeEmail);
	await User.findOneAndUpdate({ email }, { subscribe: true });

	res.status(200).json({
		message: "Newsletter Subscribe sent",
	});
};

export default {
	register: ctrlWrapper(register),
	logIn: ctrlWrapper(logIn),
	getUser: ctrlWrapper(getUser),
	updateUser: ctrlWrapper(updateUser),
	logout: ctrlWrapper(logout),
	subscribe: ctrlWrapper(subscribe),
};
