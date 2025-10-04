import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Quiz } from "../models/quiz.model.js";

// Add a questions to a quiz
const addQuestionsToQuiz = asyncHandler(async (req, res) => {
    const { quizId } = req.params;
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
        throw new ApiError(400, "At least one question is required");
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new ApiError(404, "Quiz not found");

    for (const question of questions) {
        const { text, options, points } = question;

        if (!text || !options || options.length < 2) {
            throw new ApiError(400, "Each question must have text and at least 2 options");
        }

        if (!options.some(opt => opt.isCorrect)) {
            throw new ApiError(400, "Each question must have at least one correct option");
        }

        quiz.questions.push({
            text,
            options,
            points: points || 1
        });
    }

    await quiz.save();

    return res.status(201).json(
        new ApiResponse(201, quiz, "Questions added successfully")
    );
});

// Get all questions for a quiz (without correct answer)
const getQuestionsByQuiz = asyncHandler(async (req, res) => {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId).select("questions");
    if (!quiz) throw new ApiError(404, "Quiz not found");

    // Remove isCorrect field from options
    const questionsWithoutAnswers = quiz.questions.map(q => ({
        _id: q._id,
        text: q.text,
        options: q.options.map(opt => ({
            _id: opt._id,
            text: opt.text
        })),
        points: q.points
    }));

    return res.status(200).json(
        new ApiResponse(200, questionsWithoutAnswers, "Questions fetched successfully")
    );
});

export {
    addQuestionsToQuiz,
    getQuestionsByQuiz
};
