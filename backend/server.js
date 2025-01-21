import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoute from "./routes/movie.route.js";
import tvRoute from "./routes/tv.route.js";
import searchRoute from "./routes/search.route.js";
import {ENV_VARS} from "./config/envVars.js";
import {connectDb} from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";
const app=express();

const PORT=ENV_VARS.PORT;

app.use(express.json());//will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoute);
app.use("/api/v1/tv",protectRoute,tvRoute)
app.use("/api/v1/search",protectRoute,searchRoute)

app.listen(PORT,()=>{
    console.log(`Server started at https://localhost:${PORT}`);
    connectDb();
})