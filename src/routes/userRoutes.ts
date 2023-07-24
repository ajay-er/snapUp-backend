import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { upload } from "../config/multer";
import { uploadProfile} from "../controllers/userController";
let route = express.Router();

route.put('/upload-profile',protect, upload.single('image'),uploadProfile);

export default route;
