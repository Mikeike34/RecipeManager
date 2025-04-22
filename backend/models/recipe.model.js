import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    ingredient:{
        type: [String],
        reuired: true,
        minlength: 1,
    },
    instruction:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId, //the object ID of the user
        ref: 'users', //references the users collection in MongoDB
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;