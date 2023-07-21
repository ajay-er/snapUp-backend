import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { profile } from "../controllers/userController";
import { upload } from "../config/multer";
let route = express.Router();

route.get("/profile", protect, profile);

route.post('/upload-profile', upload.single('image'));

export default route;
