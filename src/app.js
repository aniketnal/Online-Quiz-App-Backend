import express, { json } from "express";
import cors from "cors";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "16kb",

}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}));

// routes import
import userRouter from "./routes/user.route.js";

// routes declaration
// example url: http://localhost:3000/api/user/register
app.use("/api/user", userRouter)

export { app }
