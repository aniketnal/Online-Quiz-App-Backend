import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        lowercase: true,
        unique: true, 
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        unique: true, 
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
});



export const User = mongoose.model("User", userSchema);