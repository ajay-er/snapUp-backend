import { Response, Request, NextFunction } from "express";
import CustomError from "../utils/CustomError";

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

let  validationErrorHandler = (error:any)=> {
	const errors = Object.values(error.errors).map((val: any) => val.message);
	const errorMessage = errors.join('. ');
	const msg = `Invalid input data:${errorMessage}`;
	return new CustomError(msg, 400);
}

let errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";

	if (process.env.NODE_ENV === "developement") {
		devErrors(res, error);
	} else if (process.env.NODE_ENV === "production") {
		if (error.name === 'ValidationError') error = validationErrorHandler(error);

		prodErrors(res, error);
	}
};


export default errorHandler;
