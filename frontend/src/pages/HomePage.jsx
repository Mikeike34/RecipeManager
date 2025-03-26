import { Container, Text } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';

const HomePage = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#EAE0C8';
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);
  return (
    <div>HomePage</div>
  )
};

export default HomePage