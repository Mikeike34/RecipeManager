import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { useColorModeValue } from './ui/color-mode';
import { useRecipeBook } from '@/recipeBook/recipe';
import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";

const RecipeCard = ({recipe}) => {

    const textColor = useColorModeValue('#EAE0C8');
    const bg = useColorModeValue('#536878');

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
        transition = 'all 0.3s'
        _hover ={{transform: 'translateY(-5px)', shadow: 'xl'}}
        bg={'#536878'}
    >
        <Image src ={recipe.image} alt={recipe.name} h={48} w ='full' objectFit='cover'/>
        <Box  p={4}>
            <Heading as={'h3'} textDecoration='underline' mb={2}>
                {recipe.name}
            </Heading>
            <Text fontSize ='xl' color={'#EAE0C8'} mb ={4}>
                {recipe.instruction}
            </Text>
            <Text fontsize ='md' mb={4}>
                Cooking Time: {recipe.cookingTime} Minutes
            </Text>
            <HStack spacing={2}>
                <IconButton position='relative' bottom={0} colorPalette = 'red' onClick={() => handleDeleteRecipe(recipe._id)}><MdDeleteForever /></IconButton>
            </HStack>
        </Box>
        <Toaster shadow='none' />
    </Box>
  )
}

export default RecipeCard