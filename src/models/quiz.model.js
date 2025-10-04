import mongoose, { Schema } from "mongoose";

const optionSchema = new Schema({
    text: {
        type: String, 
        required: true,
    },
    isCorrect: { 
        type: Boolean, default: false 
    },
    
},
{_id: true}
)

const questionSchema = new Schema({
    text: {
        type: String, 
        required: true,
    },
    options: {
        type: [optionSchema],
        required: true,
        validate: arr => arr.length >= 2,
    },
    points: {
        type: Number,
        default: 1
    },
}, 
{_id: true}
)

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, 
{timestamps: true}
)

export const Quiz = mongoose.model("Quiz", quizSchema);