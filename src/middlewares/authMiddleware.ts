import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/CustomError";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import Admin from "../models/adminModel";

interface IDecodedToken {
	id: string;
	iat: number;
	exp: number;
	role: "admin" | "user";
}

export const protect = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
	//1.Read the token & check if token exist in header
	const testToken = req.headers.authorization;
	let token;

	if (testToken && testToken.startsWith("bearer")) {
		token = testToken.split(" ")[1];
	}

	if (!token) {
		throw new CustomError("Please Login!", 401);
	}

	//2.validate the token
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as IDecodedToken;

	//3.check the user exist or not
	if (decodedToken.role === "user") {
		const user = await User.findById(decodedToken.id);
		if (!user) {
			throw new CustomError("The user with given token doesnt exist", 401);
		}
		(req as any).user = user;
	} 

	//4.if the user change the password after the token was issued
	//pending

	next();
});

export const adminProtect = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
	//1.Read the token & check if token exist in header
	const testToken = req.headers.authorization;
	let token;

	if (testToken && testToken.startsWith("bearer")) {
		token = testToken.split(" ")[1];
	}

	if (!token) {
		throw new CustomError("Please Login!", 401);
	}

	//2.validate the token
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as IDecodedToken;

	if (decodedToken.role === "admin") {
		const admin = await Admin.findById(decodedToken.id);
		if (!admin) {
			throw new CustomError("The admin with given token doesnt exist", 401);
		}
		(req as any).admin = admin;
	} else {
		throw new CustomError("You have no access!", 403);
	}

	next();
});
