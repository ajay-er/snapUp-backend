import { NextFunction, Request, Response } from "express";

//asyncErrorHandler helps to remove all the try catch block
let asyncErrorHandler = (func: Function) => {
	return (req: Request, res: Response, next: NextFunction) => {
		func(req, res, next).catch((err: Error) => next(err));
	};
};

export default asyncErrorHandler;