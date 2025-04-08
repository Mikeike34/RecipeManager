import RecipeCard from '@/components/recipeCard';
import { Container, SimpleGrid, Text, VStack, CloseButton, Dialog, Portal, Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';



const HomePage = () => {

        const [recipes, setRecipes] = useState([]); //used to populate the homepage with recipeCards.

        const[similarRecipes, setSimilarRecipes] = useState([]);
        const[loadingSimilar, setLoadingSimilar] = useState(false);

        useEffect(() => {

          document.body.style.backgroundColor = '#EAE0C8';

          const userID = window.localStorage.getItem('userID'); //retrieves the userID for the user currently logged in. 
          console.log('Fetching recipes for userID: ', userID);
          

          const fetchRecipe = async () => { //in order to have our useEffect be asynchronous, I wrote an async function inside of the useEffect then called that function. 
              try {

                const userID = window.localStorage.getItem('userID'); //retrieves the userID for the user currently logged in. 
                console.log('Fetching recipes for userID: ', userID);


                const response = await axios.get('/api/recipes'); //uses userID as a query parameter when fetching the recipes from the database.
                console.log('Request URL: ',`/api/recipes?userOwner=${userID}` );

                const filteredRecipes = response.data.data.filter(recipe => recipe.userOwner === userID);

                
                setRecipes(filteredRecipes);
                console.log('Filtered Recipes: ', filteredRecipes);

              } catch (error) {
                console.error(error);
              }
          }

          fetchRecipe();

          return () => {
            document.body.style.backgroundColor = null;
        };

        }, []);

        const fetchSimilarRecipes = async (recipe) => {
          try{
            setLoadingSimilar(true);
            const response = await axios.post('/api/recipes/similar',{
              ingredients: recipe.ingredient,
              userOwner: recipe.userOwner,
            });
            setSimilarRecipes(response.data.data);
          }catch(error){
            console.error("Failed to fetch similar recipes", error.message);
          }finally{
            setLoadingSimilar(false);
          }
        }

        

       
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing ={8}>
        <Text
          fontSize={30}
          fontWeight={'bold'}
          textAlign={'center'}
          color={'#34495E'}
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
            <Dialog.Root key={recipe._id}>
              <Dialog.Trigger asChild>
                <div style={{ cursor: 'pointer' }}>
                  <RecipeCard recipe={recipe} />
                </div>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
                <Dialog.Positioner>
                  <Dialog.Content
                    bg="#EAE0C8"
                    color='#536878'
                    borderRadius="lg"
                    boxShadow="lg"
                    maxW="lg"
                    w="full"
                    p={6}
                  >
                    <Dialog.Header>
                      <Text fontSize="xl" fontWeight="bold">
                        {recipe.name}
                      </Text>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" bg='#536878' _hover ={{transform: 'translateY(0px)', shadow: 'md'}}/>
                      </Dialog.CloseTrigger>
                    </Dialog.Header>
                    <Dialog.Body>
                      <Text fontWeight="bold" mb={2}>Ingredients:</Text>
                      <ul>
                        {recipe.ingredient.map((ing, index) => (
                          <li key={index}>{ing}</li>
                        ))}
                      </ul>
                      <Text mt={4} fontWeight="bold">Instructions:</Text>
                      <Text>{recipe.instruction}</Text>
                      <Text mt={4}>
                        <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                      </Text>

                      {recipe.image && (
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          style={{
                            width: '100%',
                            marginTop: '1rem',
                            borderRadius: '10px',
                          }}
                        />
                      )}

                        <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
                              <Dialog.Trigger asChild>
                              <Button 
                                position='relative' 
                                bottom={-2} 
                                rounded='lg' 
                                color='white' 
                                bg={'#536878'} 
                                _hover ={{transform: 'translateY(0px)', shadow: 'md'}} 
                                onClick={()=> fetchSimilarRecipes(recipe)}
                              >
                                More Like This
                              </Button>
                              </Dialog.Trigger>
                              <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                  <Dialog.Content
                                    bg="#EAE0C8"
                                    color='#536878'
                                    borderRadius="lg"
                                    boxShadow="lg"
                                    p={6}
                                    overFlow='hidden'
                                  >
                                    <Dialog.Header>
                                      <Dialog.Title>Recommended Recipes</Dialog.Title>
                                      <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" bg='#536878' _hover ={{transform: 'translateY(0px)', shadow: 'md'}}/>
                                      </Dialog.CloseTrigger>
                                    </Dialog.Header>
                                    <Dialog.Body
                                      p={6}
                                      overFlow='hidden'
                                    >
                                      {loadingSimilar ? (
                                        <Text>Loading Similar Recipes...</Text>
                                      ) : similarRecipes.length === 0 ?(
                                        <Text>No Similar Recipes Found.</Text>
                                      ) : (
                                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} p={6} spacing={4}>
                                          {similarRecipes.map((similarRecipe) =>(
                                            <RecipeCard key = {similarRecipes._id} recipe={similarRecipe} />
                                          ))}
                                        </SimpleGrid>
                                      )}
                                    </Dialog.Body>
                                  </Dialog.Content>
                                </Dialog.Positioner>
                              </Portal>
                            </Dialog.Root>

                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          ))}
        </SimpleGrid>
        {recipes.length === 0 && (
          <Text fontSize ='xl' textAlign={'center'} fontWeight='bold' color ='gray.500'>
            No Recipes Found {" "}
            <Link to ={'/create'}>
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