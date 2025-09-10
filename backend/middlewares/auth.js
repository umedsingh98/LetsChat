//Middleware to protect routes

import User from "../models/User";
import jwt from 'jsonwebtoken'

export const protectRoute = async (req, res, next) => {

    try {
         const token = req.headers.token;

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findById(decoded.userID).select("-password");

         if(!user) return res.status(400).json({success: false, message: "User not found."});

         req.user = user;
         next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}