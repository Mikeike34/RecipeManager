import Recipe from "../models/recipe.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const createRecipe = async(req,res) => {
    const recipe = req.body; //user is sending this data

    if(!recipe.name || !recipe.ingredient || !recipe.instruction ||!recipe.image || !recipe.cookingTime || !recipe.userOwner){
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

export const saveRecipe = async (req, res) => {

    try{
        const savedRecipe = await Recipe.findById(req.body.recipeID);
        const user = await User.findById(req.body.userID);
        user.savedRecipes.push(savedRecipe);
        await user.save();
        res.json({success: true, savedRecipes: user.savedRecipes});

    }catch(error){
        res.json(error);
    }
    
};

export const getSavedRecipeIds = async (req, res) => {
    try {
        const user = await User.findById(req.body.userID);
        res.json({savedRecipes: user?.savedRecipes});
    } catch (error) {
        res.json(error);
    }
};

export const getSavedRecipes = async(req,res) =>{
    try {
        const user = await User.findById(req.body.userID);
        const savedRecipes = await Recipe.find({_id: {$in: user.savedRecipes},});
        res.json({savedRecipes: user?.savedRecipes})
    } catch (error) {
        res.json(error);
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

export const getSimilarRecipes = async(req,res) => {
    const {ingredients, userOwner} = req.body;

    if(!Array.isArray(ingredients) || !userOwner){
        return res.status(400).json({success:false, message: 'Invalid data'});
    }

    try{
        const similarRecipes = await Recipe.find({
            ingredient: {$in: ingredients},
            userOwner: {$ne: userOwner},
        });

        res.status(200).json({success: true, data: similarRecipes});
    }catch(error){
        console.error("Error fetching similar recipes: ", error.message);
        res.status(500).json({success:false, message: 'Server Error'});
    };
}