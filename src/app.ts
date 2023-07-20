import express, { Response, Request } from "express";
import morgan from "morgan";

let app = express();

app.use(express.json());

app.use(morgan("dev"));



export default app;
