import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { useColorModeValue } from './ui/color-mode';
import { useRecipeBook } from '@/recipeBook/recipe';
import { Box, Button, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";


const RecipeCard = ({recipe}) => {

    const{deleteRecipe} = useRecipeBook();

    const handleDeleteRecipe = async(pid) => {
        const {success, message} = await deleteRecipe(pid)
        if(!success){
            toaster.create({
                title: 'Error',
                description: message,
                type: 'error',
            })
        }else{
            toaster.create({
                title:'Success',
                description: "Recipe was deleted.",
                type: 'success',
                
            })
        }
    };

  return (
    <Box 
        shadow = 'lg'
        rounded = 'lg'
        overflow = 'hidden'
        transition = 'all 0.05s'
        _hover ={{transform: 'translateY(-2px)', shadow: 'xl'}}
        bg={'#536878'}
        mb={4}
        
    >
        <Image src ={recipe.image} alt={recipe.name} h={48} w ='full' objectFit='cover'/>
        <Box  p={4}>
            <Heading as={'h3'} textDecoration='underline' color='white' mb={2}>
                {recipe.name}
            </Heading>
            <Text fontsize ='md' color= 'white' mb={4}>
                Cooking Time: {recipe.cookingTime} Minutes
            </Text>
        </Box>
        <Toaster shadow='none' />
    </Box>
  )
}

export default RecipeCard