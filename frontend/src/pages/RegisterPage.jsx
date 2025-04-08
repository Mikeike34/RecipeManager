import { Container, VStack, Box, Heading, Input, Button, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useUserData } from '../../userData/user.js';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#EAE0C8';
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);


    //const [username, setUsername] = useState(''); //whatever is typed into the username input field is saved into this variable
    //const [password, setPassword] = useState(''); //whatever is typed into the password input field is saved into this variable

    const[newUser, setNewUser] = useState({
        username: "",
        password: "",
    });

    const {createUser} = useUserData()
    const handleRegisterUser = async () =>{
         const {success, message} = await createUser(newUser);
         if(!success){
            toaster.create({
                            title: `Error`,
                            description: message,
                            type: "error",
                        })
         }else{
            toaster.create({
                            title: "Success",
                            description: "User Registered",
                            type: "success",
                        })
         }
         console.log("success: ", success);
         console.log("Message: ", message);
    };

  return (
    <Container maxW = {'container.sm'} marginTop = {20}>
            <VStack spacing = {8}>
                <Box w ={'1/2'} bg = {'#536878'} p ={6} rounded = {'lg'} shadow={'md'}>
                    
                    <Heading as = {'h1'} size ={'3xl'} textAlign ={'center'}  marginBottom = {5}>
                        Register
                    </Heading>
                    <VStack spacing ={4}>
                        <Input 
                            placeholder = 'Username'
                            name = 'username'
                            type = 'text'
                            value ={newUser.username}
                            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                            
                        />
                        <Input 
                            placeholder = 'Password'
                            name = 'password'
                            type = 'password'
                            value ={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            
                        />
                        <p>Already have an account? Login</p>
                        <HStack justify ={'center'}>
                            <Button 
                                rounded='lg' 
                                bg={'#EAE0C8'} 
                                shadow ='md'
                                _hover ={{transform: 'translateY(0px)', shadow: 'lg'}}
                                onClick = {handleRegisterUser}  
                                w = 'full'
                                >
                                Register
                            </Button>
                            <Button 
                                rounded='lg' 
                                bg={'#EAE0C8'}
                                shadow ='md'
                                _hover ={{transform: 'translateY(0px)', shadow: 'lg'}}
                                w= 'full'
                            >
                                <Link to ={'/login'}>
                                Login
                                </Link>
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </VStack>
            <Toaster />
    </Container>
  )
};

export default RegisterPage