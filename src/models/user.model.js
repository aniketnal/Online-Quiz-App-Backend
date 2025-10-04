import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
}, {
    timestamps: true
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next(); 
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        id: this._id, 
        role: this.role
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}



export const User = mongoose.model("User", userSchema);