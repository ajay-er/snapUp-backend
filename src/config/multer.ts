import multer from "multer";
import { Request } from "express";
import CustomError from "../utils/CustomError";

const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	}
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(new CustomError("Invalid file type! Only JPEG & PNG are allowed", 400), false);
	}
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
