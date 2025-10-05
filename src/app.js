import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.use(cookieParser())

// routes import
import userRouter from "./routes/user.route.js";
import quizRouter from "./routes/quiz.route.js";
import resultRouter from "./routes/result.route.js";

// routes declaration
// example url: http://localhost:3000/api/user
app.use("/api/user", userRouter)

// example url: http://localhost:3000/api/quiz
app.use("/api/quiz", quizRouter)

// example url: http://localhost:3000/api/result
app.use("/api/result", resultRouter)

export { app }
