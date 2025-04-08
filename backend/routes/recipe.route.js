import express from "express";
import { createRecipe, deleteRecipe, getRecipes, getSavedRecipeIds, getSavedRecipes, getSimilarRecipes, saveRecipe, updateRecipe } from "../controllers/recipe.controller.js";
import User from "../models/user.model.js";


const router = express.Router();


//Creates a new Recipe in our recipe collection on mongoDB
router.post('/', createRecipe);

//Deletes a recipe from our recipe collection on mongoDB
router.delete("/:id", deleteRecipe);

//Gets All Recipes from the recipe collection
router.get('/', getRecipes);

//Allows a user to save a recipe they like.
router.put('/', saveRecipe);

//gets the ids for saved recipes
router.get('/savedRecipes/ids', getSavedRecipeIds);

//gets all of the information for saved recipess
router.get('/savedRecipes', getSavedRecipes);

//Updates existing recipes
router.put("/:id", updateRecipe);

router.post('/similar', getSimilarRecipes);

export default router;