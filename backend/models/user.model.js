import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {timestamps: true});

const User = mongoose.model('user', userSchema); //creates the product model

export default User; //enables the use of User in other files