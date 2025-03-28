import { Container, Flex, HStack, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { IoCreate } from "react-icons/io5";
import { Link } from 'react-router-dom'

const Navbar = () => {
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
                    <IconButton bgColor = {"#EAE0C8"} rounded = 'full' size= 'lg'>
                        <IoCreate />
                    </IconButton>
                </Link>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar