import { Button, Container, Flex, Group, HStack, IconButton, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoCreate } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const Navbar = () => {
    const [cookies, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    const logout = () => {
        setCookies('access_token', '');
        window.localStorage.removeItem('userID');
        navigate('/login');
    }

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

    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () =>{
        navigate(`/?search=${encodeURIComponent(searchInput)}`);
        setSearchInput('');
    };

if(location.pathname === '/login' || location.pathname === '/register'){
    return(
        <Container maxW = {"100vw"} px = {0}>
        <Flex
            h={16}
            alignItems = {"center"}
            justifyContent = {"space-between"}
            bgColor={"#536878"}
            flexDir = {
                {base: "column",
                    sm: "row"
                }}
        >
            <Text
                fontSize={{base: "22", sm: "28"}}
                fontWeight = {"bold"}
                textTransform = {"uppercase"}
                textAlign = {"center"}
                bgColor = {"#EAE0C8"}
                bgClip = {"text"}
                px = {4}
            >
                Recipe Manager
            </Text>
        </Flex>
    </Container>

    )
}else if(location.pathname === '/'){
    return (
        <Container maxW = {"100vw"} px = {0}>
            <Flex
                h={16}
                alignItems = {"center"}
                justifyContent = {"space-between"}
                bgColor={"#536878"}
                flexDir = {
                    {base: "column",
                        sm: "row"
                    }}
            >
                <Text
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight = {"bold"}
                    textTransform = {"uppercase"}
                    textAlign = {"center"}
                    bgColor = {"#EAE0C8"}
                    bgClip = {"text"}
                    px = {4}
                >
                    <Link to = {"/"}>Recipe Manager</Link>
                </Text>
    
                <HStack spacing = {2} alignItems = {'center'} px = {4}>
                    <Group attached w='full' maxW='sm'>
                        <Input flex = '1' value = {searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder ='Search your Recipes' />
                        <Button color = 'black' bg={'#EAE0C8'} _hover ={{transform: 'translateY(0px)', shadow: 'md'}} variant= 'outline' onClick = {handleSearch}>Search</Button>
                    </Group>
                    <Link to = {"/create"}>
                        <IconButton bgColor = {"#EAE0C8"} rounded = 'full' size= 'lg' _hover ={{transform: 'translateY(0px)', shadow: 'md'}} >
                            <IoCreate />
                        </IconButton>
                    </Link>
                    {!cookies.access_token ? (<Link to ={"/login"}> {/*checks to see if a user is logged in. If they are not logged in then there is a login button. If they are logged in then it is a log out button*/}
                    <Button rounded='lg' bg={'#EAE0C8'} _hover ={{transform: 'translateY(0px)', shadow: 'md'}}>Login/Register</Button>
                    </Link>) : (<Button onClick = {logout} rounded='lg' bg={'#EAE0C8'} _hover ={{transform: 'translateY(0px)', shadow: 'md'}}>Logout</Button>)}
                </HStack>
            </Flex>
        </Container>
      )

}
else {
    return (
        <Container maxW = {"100vw"} px = {0}>
            <Flex
                h={16}
                alignItems = {"center"}
                justifyContent = {"space-between"}
                bgColor={"#536878"}
                flexDir = {
                    {base: "column",
                        sm: "row"
                    }}
            >
                <Text
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight = {"bold"}
                    textTransform = {"uppercase"}
                    textAlign = {"center"}
                    bgColor = {"#EAE0C8"}
                    bgClip = {"text"}
                    px = {4}
                >
                    <Link to = {"/"}>Recipe Manager</Link>
                </Text>
    
                <HStack spacing = {2} alignItems = {'center'} px = {4}>
                    <Link to = {"/create"}>
                        <IconButton bgColor = {"#EAE0C8"} rounded = 'full' size= 'lg' _hover ={{transform: 'translateY(0px)', shadow: 'md'}}>
                            <IoCreate />
                        </IconButton>
                    </Link>
                    {!cookies.access_token ? (<Link to ={"/login"}> {/*checks to see if a user is logged in. If they are not logged in then there is a login button. If they are logged in then it is a log out button*/}
                    <Button rounded='lg' bg={'#EAE0C8'} _hover ={{transform: 'translateY(0px)', shadow: 'md'}}>Login/Register</Button>
                    </Link>) : (<Button onClick = {logout} rounded='lg' bg={'#EAE0C8'} _hover ={{transform: 'translateY(0px)', shadow: 'md'}}>Logout</Button>)}
                </HStack>
            </Flex>
        </Container>
      )
}
}

export default Navbar