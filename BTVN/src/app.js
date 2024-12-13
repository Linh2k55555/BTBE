import express from "express";
import productRouter from "./routers/product";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import morgan from "morgan";  
import authRouter from "./routers/auth" 


dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
//connectDB
connectDB(process.env.DB_URI);
//routes
app.use("/api", productRouter);
app.use("/api", authRouter );

export const viteNodeApp = app;