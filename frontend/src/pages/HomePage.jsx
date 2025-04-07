import RecipeCard from '@/components/recipeCard';
import { useRecipeBook } from '@/recipeBook/recipe';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

  const [recipes, setRecipes] = useState([]);
 

        useEffect(() => {

          document.body.style.backgroundColor = '#EAE0C8';
          

          const fetchRecipe = async () => { //in order to have our useEffect be asynchronous, I wrote an async function inside of the useEffect then called that function. 
              try {
                const response = await axios.get('/api/recipes');
                setRecipes(response.data.data);
                console.log(response.data);
              } catch (error) {
                console.error(error);
              }
          }

          fetchRecipe();

          return () => {
            document.body.style.backgroundColor = null;
        };

        }, []);

       
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing ={8}>
        <Text
          fontSize={30}
          fontWeight={'bold'}
          textAlign={'center'}
        >
          Your Recipes
        </Text>
        <SimpleGrid
          columns={{
            base:1,
            md:2,
            lg:3
          }}
          gap='30px'
          w={'full'}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe= {recipe}/>
          ))}
        </SimpleGrid>
        {recipes.length === 0 && (
          <Text fontSize ='xl' textAlign={'center'} fontWeight='bold' color ='gray.500'>
            No Recipes Found {" "}
            <Link to ={'/CreatePage'}>
              <Text as='span' color ='blue.500' _hover={{textDecoration: 'underline'}}>
                Create a Recipe
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
};

export default HomePage