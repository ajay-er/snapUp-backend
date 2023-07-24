import cloudinary from "../config/cloudinary";
import User from "../models/userModel";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { Request, Response } from "express";

export const uploadProfile = asyncErrorHandler(async (req: Request, res: Response) => {
	const imagePath = req.file?.path;

	const response = await cloudinary.uploader.upload(imagePath!, {
		folder: `snapup/profile_images`,
		unique_filename: true,
	});

	const secureUrl = response.secure_url;

	const id = (req as any).user._id;

	await User.findByIdAndUpdate(id, { imageUrl: secureUrl });

	res.status(200).json({
		status: "success",
		imageUrl: secureUrl
	});
});
