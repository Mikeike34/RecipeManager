import express from "express";
import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from "../controllers/recipe.controller.js";
const router = express.Router();


//Creates a new Recipe in our recipe collection on mongoDB
router.post('/', createRecipe);

//Deletes a recipe from our recipe collection on mongoDB
router.delete("/:id", deleteRecipe);

//Gets All Recipes from the recipe collection
router.get('/', getRecipes);

//Updates existing recipes
router.put("/:id", updateRecipe);

export default router;