import Recipe from "./models/recipe.model.js";
import mongoose from "mongoose";

export const createRecipe = async(req,res) => {
    const recipe = req.body; //user is sending this data

    if(!recipe.name || !recipe.ingredient || !recipe.instruction ||!recipe.image){
        return res.status(400).json({success: false, message: "Please Provide All Fields"});
    }
    const newRecipe = new Recipe(recipe)
    try{
        await newRecipe.save();
        res.status(201).json({success: true, data: newRecipe});
    }catch(error){
        console.error("error in create recipe: ", error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
};

export const getRecipes = async (req,res) => {
    try{
        const recipes = await Recipe.find({});
        res.status(200)
.json({success: true, data: recipes});
    }catch(error){
        console.log("Error in fetching recipes: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const updateRecipe = async (req, res) => {
    const {id} = req.params;
    const recipe = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try{
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {new: true});
        res.json({success:true, message: "Recipe Updated"});
    } catch(error){
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const deleteRecipe = async(req,res) => {
    const{id} = req.params; //says that the variable "id" is the id from the request parammeter
    console.log("id: ", id);
    try{
        await Recipe.findByIdAndDelete(id);
        res.json({success:true, message: "Recipe Deleted"});
    }catch(error){
        res.status(404).json({success:false, message: "Recipe not found"});
    }
};
