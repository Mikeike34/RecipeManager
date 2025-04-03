import { useRecipeBook } from '@/recipeBook/recipe';
import { Box, Button, Container, Field, Heading, HStack, Input, Textarea, VStack } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';

const CreatePage = () => {
    useEffect(() => {
            document.body.style.backgroundColor = '#EAE0C8';
            return () => {
                document.body.style.backgroundColor = null;
            };
        }, []);

    const userID = useGetUserID();

    const[newRecipe, setNewRecipe] = useState({
        name:"",
        ingredient:[],
        instruction:"",
        image:"",
        cookingTime: "",
        userOwner: userID,
     });

    

    const {createRecipe} = useRecipeBook();

    //functions to allow us to have multiple ingredients
    const handleAddIngredient = () => {
        setNewRecipe({...newRecipe, ingredient:[...newRecipe.ingredient, ""]});
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredient = [...newRecipe.ingredient];
        updatedIngredient[index] = value;
        setNewRecipe({...newRecipe, ingredient: updatedIngredient});
    };


    //creates the recipe
    const handleAddRecipe = async () => {
        const {success,message} = await createRecipe(newRecipe);
        if(!success){
            toaster.create({
                title: `Error`,
                description: message,
                type: "error",
            })
        }
         toaster.create({
                title: "Success",
                description: "Recipe Written",
                type: "success",
            })
        
        console.log("Success: ",success);
        console.log("Message: ", message);
    };


  return (
    <Container maxW = {"container.sm"} marginTop = {20}>
        <VStack spacing = {8}>
            <Box w={'2/3'} bg={'#536878'} p={6} rounded={'lg'} shadow={'md'}>
                <Heading as ={"h1"} size = {'2xl'} textAlign = {'center'}>
                    Write a Recipe
                </Heading>
                    <VStack spacing = {4}>
                        <Field.Root orientation ="horizontal">
                            <Field.Label>Name:</Field.Label>
                            <Input 
                            placeholder = 'Recipe Name' //placeholder text in the input box
                            name ='name' 
                            value = {newRecipe.name} //the value will be the name in our useState above
                            onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value })} //updating the name value
                            />
                        </Field.Root>

                        {newRecipe.ingredient.map((ingredient, index) => (
                            <Field.Root key={index} orientation="horizontal">
                                <Field.Label>Ingredient {index + 1}:</Field.Label>
                                <Input
                                    placeholder ="Enter Ingredient"
                                    value = {ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                />
                            </Field.Root>
                        ))}
                        
                        <Button onClick={handleAddIngredient}>Add Ingredient</Button>
                        

                        <Field.Root orientation="horizontal">
                            <Field.Label>Instructions:</Field.Label>
                            <Textarea
                            placeholder = 'Instructions' 
                            name ='instruction' 
                            value = {newRecipe.instruction} 
                            onChange={(e) => setNewRecipe({...newRecipe, instruction: e.target.value })} 
                            />
                        </Field.Root>

                        <Field.Root orientation = "horizontal" >
                            <Field.Label>Image URL:</Field.Label>
                            <Input
                            placeholder = 'Image URL' 
                            name ='image' 
                            value = {newRecipe.image} 
                            onChange={(e) => setNewRecipe({...newRecipe, image: e.target.value })} 
                            />
                        </Field.Root>
                        
                        <Field.Root orientation = "horizontal">
                            <Field.Label>Cooking Time:</Field.Label>
                            <Input
                            placeholder = "Cooking Time (type a number)"
                            type = "number"
                            name = "cookingTime"
                            value = {newRecipe.cookingTime}
                            onChange={(e) => setNewRecipe({...newRecipe, cookingTime: e.target.value })} 
                            />
                        </Field.Root>

                        <Button colorScheme = '#EAE0C8' onClick= {handleAddRecipe} w='full' >
                            Create
                        </Button>
                    </VStack>
            </Box>
        </VStack>
        <Toaster />
    </Container>
  )
};

export default CreatePage