import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createQuiz, getAllQuizzes, getQuizById } from "../controllers/quiz.controller.js";
import { addQuestionsToQuiz, getQuestionsByQuiz } from "../controllers/question.controller.js";
import { submitQuiz } from "../controllers/result.controller.js";

const router = Router();

// secured routes --> uses middleware (user needs to be logged in)
router.route("/create",).post( verifyJWT, createQuiz); // create quiz 
router.route("/").get(verifyJWT, getAllQuizzes); // gets all the quizzes
router.route("/:quizId").get(verifyJWT, getQuizById) // gets the quiz with specific id
router.route("/:quizId/questions").post(verifyJWT, addQuestionsToQuiz); // add question(s)
router.route("/:quizId/questions").get(verifyJWT, getQuestionsByQuiz); // get all questions
router.route("/:quizId/submit").post(verifyJWT, submitQuiz); // submit answer and get score

export default router;