import express from "express";
import { createRecipe, deleteRecipe, getRecipes, getSavedRecipeIds, getSavedRecipes, saveRecipe, updateRecipe } from "../controllers/recipe.controller.js";
import User from "../models/user.model.js";


const router = express.Router();


//Creates a new Recipe in our recipe collection on mongoDB
router.post('/', createRecipe);

//Deletes a recipe from our recipe collection on mongoDB
router.delete("/:id", deleteRecipe);

//Gets All Recipes from the recipe collection
router.get('/', getRecipes);

router.put('/', saveRecipe);

router.get('/savedRecipes/ids', getSavedRecipeIds);

router.get('/savedRecipes', getSavedRecipes);

//Updates existing recipes
router.put("/:id", updateRecipe);

export default router;