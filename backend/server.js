import express from 'express'; //using express to build out an API
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Recipe from "./models/recipe.model.js";

dotenv.config();


const app = express(); //variable for the express function

app.listen(5000, () => { //run with 'npm run dev' in terminal...using nodemon so changes are automatically updated
    connectDB();
    console.log('server started at http://localhost:5000');
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});

//endpoints for Recipe collection in mongoDB

app.post('/recipes', async(req,res) => {
    const recipe = req.body; //user is sending this data

    if(!recipe.name || !recipe.ingredient || !recipe.instruction ||!recipe.image){
        return res.status(400).json({success: false, message: "Please Provide All Fields"});
    }
    else{ const newRecipe = new Recipe(recipe)}
    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newRecipe});
    }catch(error){
        console.error("error in create recipe: ", error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
});

