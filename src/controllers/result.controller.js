import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Quiz } from "../models/quiz.model.js";
import { Result } from "../models/result.model.js";
import mongoose from "mongoose";

// Submit quiz answers
const submitQuiz = asyncHandler(async (req, res) => {
    const { quizId } = req.params;
    const { answers } = req.body; // [{ question: <id>, selectedOption: <id> }]

    if (!answers || !Array.isArray(answers)) {
        throw new ApiError(400, "Answers must be an array");
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new ApiError(404, "Quiz not found");

    let score = 0;
    const evaluatedAnswers = [];

    quiz.questions.forEach(q => {
        const userAnswer = answers.find(a => String(a.question) === String(q._id));
        if (userAnswer) {
            // Find the selected option in the question options
            const selectedOption = q.options.find(opt => String(opt._id) === String(userAnswer.selectedOption));
            const isCorrect = selectedOption?.isCorrect || false;

            if (isCorrect) score += q.points;

            evaluatedAnswers.push({
                question: q._id,
                selectedOption: selectedOption?._id,
                isCorrect
            });
        }
    });

    const result = await Result.create({
        quiz: quiz._id,
        user: req.user._id,
        score,
        answers: evaluatedAnswers
    });

    return res.status(200).json(
        new ApiResponse(200, { score, total: quiz.questions.reduce((sum, q) => sum + q.points, 0) }, "Quiz submitted successfully")
    );
});

// Get results of logged-in user
const getUserResults = asyncHandler(async (req, res) => {
    const results = await Result.find({ user: req.user._id })
        .populate("quiz", "title");

    return res.status(200).json(
        new ApiResponse(200, results, "User results fetched successfully")
    );
});

export {
    submitQuiz,
    getUserResults
};
