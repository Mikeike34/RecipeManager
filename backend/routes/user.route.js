import express from "express";
import { registerUser, userLogin } from "../controllers/user.controller.js";


const userRouter = express.Router();

//registers a new user into the users database
userRouter.post("/register",registerUser);

//authentication: checks to ensure the user exists and that the password matches. 
userRouter.post("/login", userLogin );



export default userRouter;