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
    try {
        //fetching the user's password
        const user = await User.findOne({ username }).select("password _id").lean();

        //if the user does not exist.
        if (!user) {
            return res.json({ success: false, message: "User Does Not Exist" });
        }

        //comparing the hashed password
        const isPasswordValid = await new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        //if the password inputted does not match the password in the database associated with this user. 
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Your Password Is Incorrect" });
        }

        //generating a token
        const token = await new Promise((resolve, reject) => {
            jwt.sign({ id: user._id }, "secret", (err, token) => {
                if (err) reject(err);
                else resolve(token);
            });
        });

        res.json({ success: true, token, userID: user._id });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};
