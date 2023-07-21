import { Response, Request, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import multer from "multer";

let devErrors = (res: Response, error: CustomError) => {
	res.status(error.statusCode).json({
		status: error.statusCode,
		message: error.message,
		stackTrack: error.stack,
		error: error
	});
};

let prodErrors = (res: Response, error: CustomError) => {
	if (error.isOperational) {
		res.status(error.statusCode).json({
			status: error.statusCode,
			message: error.message
		});
	} else {
		res.status(500).json({
			message: "Something went wrong!try again later!",
			status: "Error"
		});
	}
};

let validationErrorHandler = (error: any) => {
	const errors = Object.values(error.errors).map((val: any) => val.message);
	const errorMessage = errors.join(". ");
	const msg = `Invalid input data:${errorMessage}`;
	return new CustomError(msg, 400);
};

let jwtErrorHandler = () => {
	const msg = "Invalid token. Please log in again.";
	return new CustomError(msg, 401);
};

let multerErrorHandler = (error: any) => {
	if (error.code === "LIMIT_FILE_SIZE") {
		return new CustomError("File size limit exceeded. Max file size is 2MB.", 400);
	}
	if (error.code === "LIMIT_FILE_COUNT") {
		return new CustomError("Too many files uploaded. Only one file is allowed.", 400);
	}
	if (error.code === "LIMIT_UNEXPECTED_FILE") {
		return new CustomError("Invalid field name. Only 'image' field is allowed.", 400);
	}

	return error;
};

let errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";

	if (process.env.NODE_ENV === "developement") {
		devErrors(res, error);
	} else if (process.env.NODE_ENV === "production") {
		if (error.name === "ValidationError") error = validationErrorHandler(error);
		if (error.name === "JsonWebTokenError") error = jwtErrorHandler();
		if (error instanceof multer.MulterError) error = multerErrorHandler(error);

		prodErrors(res, error);
	}
};

export default errorHandler;
