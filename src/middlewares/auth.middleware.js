import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken;
        if(!token) {
            throw new ApiError(401, "Unauthorized Token")
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodeToken?._id).select("-password")
        if(!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(500, "Invalid Access Token")
    }
}


export default verifyJWT