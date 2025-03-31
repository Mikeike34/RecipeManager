import { Box, Button, Container, Heading, HStack, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useUserData } from '../../userData/user';
import { toaster, Toaster } from '@/components/ui/toaster';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
     useEffect(() => {
                document.body.style.backgroundColor = '#EAE0C8';
                return () => {
                    document.body.style.backgroundColor = null;
                };
            }, []);

            const[user, setUser] = useState({
                username: "",
                password: "",
            });

            const {checkUser} = useUserData()

            const [_, setCookies] = useCookies(["access_token"]);
            const navigate = useNavigate();

            const handleUserLogin = async (e) => {
                e.preventDefault();
                const result = await checkUser(user);
                if(!result.success){
                    toaster.create({
                        title: `Error`,
                        description: message,
                        type: "error",
                    })
                }else{
                    setCookies("access_token", result.data.token);
                    window.localStorage.setItem("userID", result.data.userID);
                    navigate("/");
                    toaster.create({
                        title: "Success",
                        description: "User Registered",
                        type: "success",
                    })
                }
            }            
    
  return (
    <Container maxW = {'container.sm'} marginTop = {20}>
        <VStack spacing = {8}>
            <Box w ={'full'} bg = {'#536878'} p ={6} rounded = {'lg'} shadow={'md'}>
                <Heading as = {'h1'} size ={'3xl'} textAlign ={'center'}  marginBottom = {5}>
                    Login
                </Heading>
                <VStack spacing ={4}>
                    <Input 
                        placeholder = 'username'
                        name = 'username'
                        type = 'text'
                        value ={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                                
                    />
                    <Input 
                        placeholder = 'Password'
                        name = 'password'
                        type = 'password'
                        value ={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}    
                    />
                    <p>Don't have an account? Register</p>
                    <HStack justify = {'center'}>
                        <Button 
                            colorScheme = '#EAE0C8' 
                            onClick = {handleUserLogin}  
                            w = 'full'
                        >
                            Login
                        </Button>
                            <Button 
                                colorScheme = '#EAE0C8' 
                                w= 'full'
                            >
                                <Link to ={'/register'}>
                                    Register
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

export default LoginPage