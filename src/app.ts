import express from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorMiddleware";

let app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(errorHandler);

export default app;
