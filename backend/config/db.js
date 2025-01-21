import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDb = async () => {
    try {
        const db = await mongoose.connect(ENV_VARS.MONGO_URL);
        console.log("connected to MONGODB", db.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1)//1 means there was an error 0 means success
    }
}