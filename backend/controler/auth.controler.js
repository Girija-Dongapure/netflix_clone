import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generatetokenAndCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try{
        const {username,email,password} = req.body;
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        if(!username || !email || !password){
            return res.status(400).json({mesage:"All fields are required"});
        }
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"email is not valid"})
        }
        if(password.length<6){
            return res.status(400).json({success:false,message:"password must be greater than 6 characters"})
        }
        const existingUser=await User.findOne({username:username});
        if(existingUser){
            return res.status(400).json({success:false,message:"username already exist"})
        }
        const existingEmail=await User.findOne({email:email});
        if(existingEmail){
            return res.status(400).json({success:false,message:"email already taken"})
        }
        const PROFILE_PICS = ["/avatar1.png","/avatar2.png","/avatar3.png"];

        const image=PROFILE_PICS[Math.floor(Math.random()* PROFILE_PICS.length)];

        const newUser =new User({
            username:username,
            email:email,
            password:hashedPassword,
            image:image
        });
        generatetokenAndCookie(newUser._id,res);
        await newUser.save();
        res.status(200).json({success:true,
            user:{
                ...newUser._doc,
                
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"error while signup"});
    }
}
export async function login(req, res) {
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false,message:"invalid credentials"})
        }
        const isPasswordMatch=await bcryptjs.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(404).json({success:false,message:"invalid credentials"})
        }
        generatetokenAndCookie(user._id,res);
        res.status(200).json({success:true,
            user:{
                ...user._doc,
                password:""
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"error while login"});
    }
}
export async function logout(req, res) {
   try{
    res.clearCookie("jwt-netflix");
    res.status(200).json({success:true,message:"logedout successfully"});
   } catch(err){
    console.log(err);
    res.status(500).json({success:false,message:"error while loggingout"});
}

}
export async function authCheck(req,res){
    try{
        console.log("req.user is -",req.user);
        res.status(200).json({success:true,user:req.user});
        
    }catch(err){
        console.log(err.message);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}
    