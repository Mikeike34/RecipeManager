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
    }
}, {timestamps: true});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;