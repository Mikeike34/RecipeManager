import { create } from 'zustand'; //zustand is a state management library for React


//Global state for our functions. 
export const useRecipeBook = create((set) => ({
    recipes: [],
    setRecipes:(recipes) => set({ recipes }),

    //function for creating a Recipe in the database. 
    createRecipe: async(newRecipe) => {
        if(!newRecipe.name || !newRecipe.ingredient || !newRecipe.instruction || !newRecipe.image){
            return {success: false, message: 'Please Provide All Fields.'}
        }
        const res = await fetch("/api/recipes", {
            method:'POST', //method for database
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe) //stringifies the newRecipe object that we just got as an argument.
        })
        const data = await res.json(); //allows us to extract the newRecipe data
        set((state) => ({recipes:[...state.recipes, data.data]})) //'...state.recipes' means keep all previous recipes that we had. data.data is adding new information. data.data because our createRecipe function in our controller returns a new Recipe under 'data'
        return {success: true, message: 'Recipe Created Successfully.'}
    },

}));