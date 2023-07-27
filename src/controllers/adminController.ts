import asyncErrorHandler from "../utils/asyncErrorHandler";
import { Request, Response } from "express";
import CustomError from "../utils/CustomError";
import generateToken from "../utils/jwtToken";
import Admin from "../models/adminModel";
import User from "../models/userModel";
import { isEqual } from "lodash";

export const login = asyncErrorHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomError("Email & password fields are required for login!😎", 400);
	}

	const admin = await Admin.findOne({ email }).select("password name");

	const isMatch = await admin?.comparePasswordInDB(password, admin.password);

	if (!admin || !isMatch) {
		throw new CustomError("Invalid credentials!🥴", 400);
	}


	const token = generateToken({id:admin._id,role:'admin'});

	res.status(200).json({
		status: "success",
		message: "admin login successfull",
		admin: {
			name: admin.name,
			id: admin._id
		},
		token
	});
});

export const getAllUsers = asyncErrorHandler(async (req: Request, res: Response) => {
	const page: number = Number(req.query.page) || 1;
	const limit: number = Number(req.query.limit) || 5;
	const skip: number = (page - 1) * limit;
	const users = await User.find().skip(skip).limit(limit);

	res.status(200).json({
		status: "success",
		users
	});
});

export const getUserData = asyncErrorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;

	const user = await User.findById(id);

	res.status(200).json({
		status: "success",
		user
	});
});

export const updateUser = asyncErrorHandler(async (req: Request, res: Response) => {
	const { id: id, ...data } = req.body;

	const existingUser = await User.findById(id);

	if (!existingUser) {
		throw new CustomError("User doesnt exist!", 404);
	}

	const userData = {
		name: existingUser.name,
		age: existingUser.age,
		email: existingUser.email
	};

	const isDataChanged = !isEqual(userData, data);

	if (!isDataChanged) {
		return res.status(400).json({
			status: "error",
			message: "No changes made to the user data."
		});
	}

	const user = await User.findByIdAndUpdate(id, data, { new: true });
	res.status(200).json({
		status: "success",
		user
	});
});


export const deleteUser = asyncErrorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	
	const result = await User.findByIdAndDelete(id);

	if (!result) {
		throw new CustomError('Wrong user Id', 400);
	}

	res.status(200).json({
		status: "success",
		message:"user deleted successfully"
	});

})