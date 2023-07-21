import asyncErrorHandler from "../utils/asyncErrorHandler";
import { Request, Response } from "express";
import User from "../models/userModel";
import CustomError from "../utils/CustomError";
import generateToken from "../utils/jwtToken";

export const signup = asyncErrorHandler(async (req: Request, res: Response) => {
	const newUser = await User.create(req.body);

	const token = generateToken(newUser._id);

	res.status(201).json({
		status: "succuss",
		token
	});
});

export const login = asyncErrorHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomError("Email & password fields are required for login!😎", 400);
	}

	const user = await User.findOne({ email }).select('password');
	
	const isMatch = await user?.comparePasswordInDB(password, user.password);

	if (!user || !isMatch) {
		throw new CustomError("Invalid credentials!🥴", 400);
	}

	const token = generateToken(user._id);

	res.status(200).json({
		status: "success",
		token
	});
});
