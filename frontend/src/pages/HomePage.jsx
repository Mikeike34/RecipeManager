import RecipeCard from '@/components/recipeCard';
import { Toaster, toaster } from "@/components/ui/toaster";
import { Container, SimpleGrid, Text, VStack, CloseButton, Dialog, Portal, Button, HStack, IconButton, Drawer, For } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { useRecipeBook } from '@/recipeBook/recipe';




const HomePage = () => {

        const userID = window.localStorage.getItem('userID'); //retrieves the userID for the user currently logged in. 
        const [isLoggedIn, setIsLoggedIn] = useState(!!userID);

        const [recipes, setRecipes] = useState([]); //used to populate the homepage with recipeCards.

        const[similarRecipes, setSimilarRecipes] = useState([]);
        const[loadingSimilar, setLoadingSimilar] = useState(false);

        const location = useLocation();
        const[filteredRecipes, setFilteredRecipes] = useState(recipes);

        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('search')?.toLowerCase() || '';

        const [favoriteCategory, setFavoriteCategory] = useState('');
        const [userRecipes, setUserRecipes] = useState([]);

        const [noRecommendations, setNoRecommendations] = useState(true); //state to show if there are no recommendations
        const [recommendedRecipes, setRecommendedRecipes] = useState([]);

        

        useEffect(() => {
          document.body.style.backgroundColor = '#EAE0C8';
          
          const fetchRecipe = async () => { //in order to have our useEffect be asynchronous, I wrote an async function inside of the useEffect then called that function. 
              try {

                const userID = window.localStorage.getItem('userID'); //retrieves the userID for the user currently logged in. 
                console.log('Fetching recipes for userID: ', userID);


                const response = await axios.get('/api/recipes'); //gets all of the recipes in the database. 
                console.log('Request URL: ',`/api/recipes?userOwner=${userID}` );

                const userRecipes = response.data.data.filter(recipe => recipe.userOwner === userID); //filters the recipes from the database to include only user's recipes.
                setRecipes(userRecipes); //assigns the filtered recipes to a variable called userRecipes.
                console.log('Filtered Recipes: ', userRecipes);

                  //Finds the 'favorite' category of the user(the category they use the most in their recipes).
                if(userRecipes.length > 0){
                  const categoryCounts = {};
                  userRecipes.forEach(recipe => { //counts all of the instances of each category of recipe the user has created and assigns each count to categoryCounts
                    const category = recipe.category;
                    categoryCounts[category] = (categoryCounts[category] || 0)+1;
                  });
                  
                  const favoriteCategory = Object.keys(categoryCounts).reduce((a,b)=> //uses categoryCount to find whihc category of recipe the user has the most of and assigns it to favoriteCategory
                    categoryCounts[a] > categoryCounts[b] ? a : b
                  );

                  setFavoriteCategory(favoriteCategory); //sets the favoriteCategory
                  console.log('Favorite Category: ', favoriteCategory);
                }

                //filters the database for just recipes that fall under the same category as the user's favorite category and are not the user's recipes. 
              
              } catch (error) {
                console.error(error);
              }
          };

          fetchRecipe();

          return () => {
            document.body.style.backgroundColor = null;
        };

        }, []);


        const linearSearchRecipes = (recipes , query) => {  //linear search algorithm for homepage search function.
          const lowerQuery = query.toLowerCase();
          const results = [];
            
            for( let i = 0; i < recipes.length; i++){
              const recipeName = recipes[i].name.toLowerCase();
              if(recipeName.includes(lowerQuery)){
                  results.push(recipes[i]);
              }
            }
      
            return results;
      }

        useEffect(()=>{
          if(searchQuery === ''){
            setFilteredRecipes(recipes);
          }else{
            const results = linearSearchRecipes(recipes, searchQuery); //using the results from the linear search algorithm
            setFilteredRecipes(results);
          }
        }, [searchQuery, recipes]);

        //reccommended recipes 
        useEffect(() => {

          const recommendRecipes = async () => { //function to iterate through the database of recipes looking for recipes that share a category witht he user's most used recipe category. 
            try{

              if(favoriteCategory){
                const userID = window.localStorage.getItem('userID');
              const response = await axios.get('/api/recipes');
              const allRecipes = response.data.data;

              const recommendations = [];
              for(let i = 0; i < allRecipes.length; i++){
                const recipeCategory = allRecipes[i].category;
                const recipeOwner = allRecipes[i].userOwner;
                if(recipeCategory === favoriteCategory && recipeOwner !== userID){
                  recommendations.push(allRecipes[i]);
                }
              }

              console.log('filtered recommendations: ', recommendations);
              setRecommendedRecipes(recommendations);
              }
              if(recommendations > 0){
                setNoRecommendations(true);
              }else{
                setNoRecommendations(false);
              }
              
            } catch (error){
              console.error(error);
            }
          }; 

          recommendRecipes();

        }, [favoriteCategory]);

        

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

                    setRecipes(prev => prev.filter(recipe => recipe._id !== pid));
                }
            };



       
  return (
    <Container maxW='container.xl' py={12}>

      {/*ChakraUi Drawer Component for recommended recipes of a specific category*/}
      <HStack wrap="wrap">
            <For each={["bottom"]}>
              {(placement) => (
                <Drawer.Root key='bottom' placement='bottom'>
                  <Drawer.Trigger asChild>
                    <Button variant="outline" size="sm" color='white' bg = '#536878'_hover ={{transform: 'translateY(0px)', shadow: 'md'}} >
                      Recipes You Might Like 
                    </Button>
                  </Drawer.Trigger>
                  <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                      <Drawer.Content
                        roundedTop={placement === "bottom" ? "l3" : undefined}
                        roundedBottom={placement === "top" ? "l3" : undefined}
                      >
                        <Drawer.Header>
                          <Drawer.Title>
                          {`You seem to like ${favoriteCategory} recipes. Here are more ${favoriteCategory} recipes:`}
                          </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                        {noRecommendations ? (
                          <Text>There are no recommendations yet...Check back later!</Text>
                        ) : (
                          
                          <HStack spacing ={8}>
                            <SimpleGrid
                              columns={{
                                base:1,
                                md:2,
                                lg:3
                              }}
                              gap='30px'
                              w={'full'}
                            >
                              {recommendedRecipes.map((recipe) => (
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
                                        </Dialog.Body>
                                      </Dialog.Content>
                                    </Dialog.Positioner>
                                  </Portal>
                                </Dialog.Root>
                              ))}
                            </SimpleGrid>
                          </HStack>
                        )}
                        </Drawer.Body>
                        <Drawer.Footer>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                      </Drawer.Content>
                    </Drawer.Positioner>
                  </Portal>
                </Drawer.Root>
              )}
            </For>
          </HStack>
          {/*End of chakraUI drawer componenet for recommended recipes (Recipes You Might Like)*/}


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
          {filteredRecipes.map((recipe) => (
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

                        {/*Beginning of dialog component that shows recommended recipes based on the recipe selected*/}
                      <HStack spacing={2}>
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
                                      <Dialog.Title>Recommended Recipes:</Dialog.Title>
                                      <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" bg='#536878' _hover ={{transform: 'translateY(0px)', shadow: 'md'}}/>
                                      </Dialog.CloseTrigger>
                                    </Dialog.Header>
                                    <Dialog.Body
                                      p={6}
                                      overflowY = 'auto'
                                      maxH='60vh'
                                    >
                                      {loadingSimilar ? (
                                        <Text>Loading Similar Recipes...</Text>
                                      ) : similarRecipes.length === 0 ?(
                                        <Text>No Similar Recipes Found.</Text>
                                      ) : (
                                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6}>
                                          {similarRecipes.map((similarRecipe) =>(

                                            //Dialog component for viewing a recommended recipe's information
                                            <Dialog.Root key={recipe._id}>
                                              <Dialog.Trigger asChild>
                                                <div style={{ cursor: 'pointer' }}>
                                                  <RecipeCard key = {similarRecipes._id} recipe={similarRecipe} />
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
                                                      {similarRecipe.name}
                                                    </Text>
                                                    <Dialog.CloseTrigger asChild>
                                                      <CloseButton size="sm" bg='#536878' _hover ={{transform: 'translateY(0px)', shadow: 'md'}}/>
                                                    </Dialog.CloseTrigger>
                                                  </Dialog.Header>
                                                  <Dialog.Body>
                                                    <Text fontWeight="bold" mb={2}>Ingredients:</Text>
                                                    <ul>
                                                      {similarRecipe.ingredient.map((ing, index) => (
                                                        <li key={index}>{ing}</li>
                                                      ))}
                                                    </ul>
                                                    <Text mt={4} fontWeight="bold">Instructions:</Text>
                                                    <Text>{similarRecipe.instruction}</Text>
                                                    <Text mt={4}>
                                                      <strong>Cooking Time:</strong> {similarRecipe.cookingTime} minutes
                                                    </Text>

                                                    {similarRecipe.image && (
                                                      <img
                                                        src={similarRecipe.image}
                                                        alt={similarRecipe.name}
                                                        style={{
                                                          width: '100%',
                                                          marginTop: '1rem',
                                                          borderRadius: '10px',
                                                        }}
                                                      />
                                                    )}
                                                  </Dialog.Body>
                                                </Dialog.Content>
                                              </Dialog.Positioner>
                                            </Portal>
                                            </Dialog.Root>
                                          ))}
                                        </SimpleGrid>
                                      )}

                                    </Dialog.Body>
                                  </Dialog.Content>
                                </Dialog.Positioner>
                              </Portal>
                            </Dialog.Root>
                            <IconButton 
                              position='relative' 
                              bottom={-2} 
                              colorPalette = 'red'  
                              _hover ={{transform: 'translateY(0px)', shadow: 'md'}}
                              onClick={() => handleDeleteRecipe(recipe._id)}
                            >
                              <MdDeleteForever />
                            </IconButton>
                          </HStack>

                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          ))}
          
        </SimpleGrid>
        {recipes.length === 0 && isLoggedIn &&( //if the user simply does not have any recipes created, this will display.
          <Text fontSize ='xl' textAlign={'center'} fontWeight='bold' color ='gray.500'>
            No Recipes Found {" "}
            <Link to ={'/create'}>
              <Text as='span' color ='blue.500' _hover={{textDecoration: 'underline'}}>
                Create a Recipe
              </Text>
            </Link>
          </Text>
        )}
        {filteredRecipes.length === 0 && recipes.length > 0 && ( //if our search results return nothing, this will display.
          <Text fontSize ='xl' textAlign={'center'} fontWeight='bold' color ='gray.500'>
            Your Search Was Not Found... <br></br>
            <Link to={'/'}>
            <Button color = {'#EAE0C8'} rounded='lg' bg={"#536878"} _hover ={{transform: 'translateY(0px)', shadow: 'md'}}>Clear Search</Button>
          </Link>
          </Text>
          
        )}
        {!isLoggedIn && (
          <Text fontSize ='xl' textAlign={'center'} fontWeight='bold' color ='gray.500'>
            Please <Link to={'/login'}><Text as ='span' color = 'blue.500' _hover={{textDecoration: 'underline'}}>Login</Text></Link> To view your recipes
          </Text>
        )}
      </VStack>


      


      <Toaster />
    </Container>

    
  )
};



export default HomePage