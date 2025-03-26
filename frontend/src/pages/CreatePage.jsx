import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
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

  return (
    <Container maxW = {"container.sm"} marginTop = {20}>
        <VStack spacing = {8}>
            <Box w={'full'} bg={'#536878'} p={6} rounded={'lg'} shadow={'md'}>
                <VStack spacing = {4}>
                <Heading as ={"h1"} size = {'2xl'} textAlign = {'center'}>
                Write a Recipe
            </Heading>
                <Input
                        placeholder = 'Recipe Name' //placeholder text in the input box
                        name ='name' 
                        value = {newRecipe.name} //the value will be the name in our useState above
                        onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value })} //updating the name value
                    />
                    <Input
                        placeholder = 'Add Ingredient' 
                        name ='ingredient' 
                        value = {newRecipe.ingredient} 
                        onChange={(e) => setNewRecipe({...newRecipe, ingredient: e.target.value })} 
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

                    <Button colorScheme = '#EAE0C8' w='full'>
                        Create
                    </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
  )
};

export default CreatePage