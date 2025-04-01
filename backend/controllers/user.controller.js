import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';


export const registerUser = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username}); //looks for an existing username that is the same as the one passed into this function. 

    if(user) {
        return res.json({success:false, message: "User Already Exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10); //hashes the password set by the user. 

    const newUser = new User({username, password: hashedPassword}); //creates a new user with the username and password passed in by the user. This also sends the hashedPassword. 

    try{
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    }catch(error){
        console.error("error in creating user: ", error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
};

export const userLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username}); //looks for an existing username that is the same as the one passed into this function. 

    if(!user){ //if the user is not found in the database
        return res.json({success: false, message: "User Does Not Exist"});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password); //compares the password inputted with the password attached to the username found in the database.

    if(!isPasswordValid){ //if the password does not match what is found in the database.
        return res.json({success: false, message: "Your Password Is Incorrect"});
    }

    try{
        const token = await jwt.sign({id: user._id}, "secret");
        res.json({success: true, token, userID: user._id});
    }catch(error){
        console.error(error.message);
        res.json({success: false, message: error.message});
    }

};