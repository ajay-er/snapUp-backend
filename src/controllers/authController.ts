import asyncErrorHandler from "../utils/asyncErrorHandler";
import { Request, Response } from "express";
import User from "../models/userModel";
import CustomError from "../utils/CustomError";
import generateToken from "../utils/jwtToken";

const url = 'https://api.multiavatar.com/Binx Bond.png';

export const signup = asyncErrorHandler(async (req: Request, res: Response) => {
	req.body.imageUrl = url;
	const newUser = await User.create(req.body);
	const { password, ...newUserExcludePassword } = newUser.toObject();

	const token = generateToken(newUser._id);

	res.status(201).json({
		status: "succuss",
		message: "Accont created successfully",
		token,
		user: newUserExcludePassword
	});
});

export const login = asyncErrorHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomError("Email & password fields are required for login!😎", 400);
	}

	const user = await User.findOne({ email }).select("password name");

	const isMatch = await user?.comparePasswordInDB(password, user.password);

	if (!user || !isMatch) {
		throw new CustomError("Invalid credentials!🥴", 400);
	}

	const token = generateToken(user._id);

	res.status(200).json({
		status: "success",
		message: "login successfull",
		user: {
			name: user.name,
			id: user._id
		},
		token
	});
});
