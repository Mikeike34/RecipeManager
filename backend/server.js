import express from 'express'; //using express to build out an API
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import recipeRoutes from "./routes/recipe.route.js";
import userRoutes from "./routes/user.route.js";


dotenv.config();

const app = express(); //variable for the express function
const PORT = process.env.PORT; 


app.use(express.json());

app.use("/api/recipes", recipeRoutes); //allows the recipe routes to be prefixed with "/api/recipes"
app.use("/api/users", userRoutes); //allows the user routes to be prefixed with "/api/users"

app.listen(PORT, () => { //run with 'npm run dev' in terminal...using nodemon so changes are automatically updated
    connectDB();
    console.log('server started at http://localhost:5000');
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});



