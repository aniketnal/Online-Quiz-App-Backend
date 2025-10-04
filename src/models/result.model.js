import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema({
    question: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Quiz.questions",
        required: true 
    },
    selectedOption: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    isCorrect: { 
        type: Boolean, 
        required: true 
    },
});

const resultSchema = new Schema({
    quiz: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Quiz", 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    score: { 
        type: Number, 
        required: true 
    },
    answers: [answerSchema],
}, { timestamps: true });

export const Result = mongoose.model("Result", resultSchema);
