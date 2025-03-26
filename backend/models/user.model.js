import mongoose from "mongoose";

const userSchema = new mongoose.schema({
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
    profilePicture:{
        type: String, //URL or file path to profile picture
        default: ['https://plus.unsplash.com/premium_photo-1692394464954-02ad05c0681f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNvb2tib29rfGVufDB8fDB8fHww']
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema); //creates the product model

export default User; //enables the use of User in other files