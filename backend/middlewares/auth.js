//Middleware to protect routes

import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const protectRoute = async (req, res, next) => {

    try {
         const token = req.headers.token;

         if (!token) {
           return res.status(401).json({success: false, message: "No token provided"});
         }

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         console.log("Decoded token:", decoded);
         
         const user = await User.findById(decoded.userId);
         console.log("User found:", user ? user.fullname : "No user found");

         if(!user){ 
          return res.status(404).json({success: false, message: "User not found."});
         }
         req.user = user;
         next();
    } catch (error) {
        console.log("Auth middleware error:", error.message);
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({success: false, message: "Invalid token"});
        }
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({success: false, message: "Token expired"});
        }
        return res.status(500).json({success: false, message: error.message});
    }
}