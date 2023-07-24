import express from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorMiddleware";
import authRouter from "./routes/authRouter";
import adminRouter from "./routes/adminRoutes";
import userRouter from "./routes/userRoutes";
import cors from "cors";

let app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));  

//routes
app.use("/api/v1/auth", authRouter); 

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/user", userRouter); 

app.use(errorHandler);

export default app; 
