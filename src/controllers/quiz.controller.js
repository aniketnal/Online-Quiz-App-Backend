import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Quiz } from "../models/quiz.model.js";

// Create a quiz
const createQuiz = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title?.trim()) {
        throw new ApiError(400, "Quiz title is required");
    }

    const quiz = await Quiz.create({
        title,
        createdBy: req.user._id, // from auth middleware
    });

    return res.status(201).json(
        new ApiResponse(201, quiz, "Quiz created successfully")
    );
});

// Get all available quizzes quizzes (Bonus feature)
// route to be added
const getAllQuizzes = asyncHandler(async (req, res) => {
    const quizzes = await Quiz.find().select("title createdBy createdAt");
    return res.status(200).json(
        new ApiResponse(200, quizzes, "Quizzes fetched successfully")
    );
});

// Get a single quiz by ID
// route to be added
const getQuizById = asyncHandler(async (req, res) => {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId).select("title questions");
    if (!quiz) throw new ApiError(404, "Quiz not found");

    return res.status(200).json(
        new ApiResponse(200, quiz, "Quiz fetched successfully")
    );
});

export {
    createQuiz,
    getAllQuizzes,
    getQuizById
};
