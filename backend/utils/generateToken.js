import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generatetokenAndCookie = (userId,res) => {
   const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"15d"})

   res.cookie("jwt-netflix",token,{
    maxAge:15*24*60*60*1000,//15 days in milli second
    httpOnly:true,//make it not accessed by JS
    sameSite:"strict",
    secure:ENV_VARS.NODE_ENV
   })
   return token
}