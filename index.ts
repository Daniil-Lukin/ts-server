import express from "express";
import cors, { CorsOptions } from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AuthRouter from "./routers/auth-router";
import ValueRouter from "./routers/value-router";

dotenv.config();
const PORT: number | string = process.env.PORT || 3000;
const authRoute: string = "/api/auth";
const valueRoute: string = "/api/value";

const app = express();
const corsParams: CorsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsParams));
app.use(express.json());
app.use(cookieParser());
app.use(authRoute, AuthRouter);
app.use(valueRoute, ValueRouter);

const start = async () => {
  try {
    await mongoose.connect(String(process.env.DB_URL));
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
