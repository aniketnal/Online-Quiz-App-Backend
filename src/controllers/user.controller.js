import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"

const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken(); 

        return accessToken;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const {username, email, password, role} = req.body

    if([username, email, password].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if(existedUser) throw new ApiError(409, "User already exists with given email or username")
    
    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        role
    });

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(500, "User creation failed") 
    }

    return res.status(201).json(
        // statusCode, data, message etc
        new ApiResponse(201, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler( async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) throw new ApiError(400, "Email and password are required");

    const user = await User.findOne({ email })
    if(!user) throw new ApiError(404, "User does not exist");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

    const accessToken = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password"
    )

    // cookie options
    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser, accessToken
        } ,"User logged in successfully")
    )
})

const logoutUser = asyncHandler( async(req, res) => {
    
    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(
        new ApiResponse(200, "User logged out successfully")
    )
})


export {
    registerUser,
    loginUser,
    logoutUser
}