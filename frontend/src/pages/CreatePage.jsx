import { useRecipeBook } from '@/recipeBook/recipe';
import { Box, Button, Container, Heading, HStack, Input, VStack } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";
import React, { useState } from 'react';
import { useEffect } from 'react';

const CreatePage = () => {
    useEffect(() => {
            document.body.style.backgroundColor = '#EAE0C8';
            return () => {
                document.body.style.backgroundColor = null;
            };
        }, []);

        const[newRecipe, setNewRecipe] = useState({
            name:"",
            ingredient:[],
            instruction:"",
            image:"",
        });

        const {createRecipe} = useRecipeBook()

        const handleAddRecipe = async () => {
            const {success,message} = await createRecipe(newRecipe);
            if(!success){
                toaster.create({
                    title: `Error`,
                    description: message,
                    type: "error",
                })
            }else{
                toaster.create({
                   title: "Success",
                   description: "Recipe Written",
                   type: "success",
                })
            }
            console.log("Success: ",success);
            console.log("Message: ", message);
        };

  return (
    <Container maxW = {"container.sm"} marginTop = {20}>
        <VStack spacing = {8}>
            <Box w={'full'} bg={'#536878'} p={6} rounded={'lg'} shadow={'md'}>
                <Heading as ={"h1"} size = {'2xl'} textAlign = {'center'}>
                    Write a Recipe
                </Heading>
                <HStack w = "full" spacing = {4}>
                    <VStack spacing = {4}>
                        
                        <Input 
                            placeholder = 'Recipe Name' //placeholder text in the input box
                            name ='name' 
                            value = {newRecipe.name} //the value will be the name in our useState above
                            onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value })} //updating the name value
                        />
                        <Input
                            placeholder = 'Instructions' 
                            name ='instruction' 
                            value = {newRecipe.instruction} 
                            onChange={(e) => setNewRecipe({...newRecipe, instruction: e.target.value })} 
                        />
                        <Input
                            placeholder = 'Image URL' 
                            name ='image' 
                            value = {newRecipe.image} 
                            onChange={(e) => setNewRecipe({...newRecipe, image: e.target.value })} 
                        />
                        <Button colorScheme = '#EAE0C8' onClick= {handleAddRecipe} w='full' >
                            Create
                        </Button>
                    </VStack>
                    <VStack>
                        
                        <Input
                            placeholder = 'Add Ingredient' 
                            name ='ingredient' 
                            value = {newRecipe.ingredient} 
                            onChange={(e) => setNewRecipe({...newRecipe, ingredient: e.target.value })} 
                        />
                        <Input
                            placeholder = 'Add Ingredient' 
                            name ='ingredient' 
                            value = {newRecipe.ingredient} 
                            onChange={(e) => setNewRecipe({...newRecipe, ingredient: e.target.value })} 
                        />
                        <Input
                            placeholder = 'Add Ingredient' 
                            name ='ingredient' 
                            value = {newRecipe.ingredient} 
                            onChange={(e) => setNewRecipe({...newRecipe, ingredient: e.target.value })} 
                        />
                    </VStack>
                </HStack>
            </Box>
        </VStack>
        <Toaster />
    </Container>
  )
};

export default CreatePage