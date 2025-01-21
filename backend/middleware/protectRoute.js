import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = await req.cookies["jwt-netflix"];
        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized access"});
        }
        const decoded=jwt.verify(token,ENV_VARS.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false,message:"Unauthorized -token verification failed"});
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({success:false,message:"user not found"});
        }
        req.user=user;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"internal server error"});
    }
}