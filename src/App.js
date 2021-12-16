import React from 'react';
import { Box, ChakraProvider, Flex, Grid, Heading, theme } from '@chakra-ui/react';
import { Topic } from './components';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='100vh' p={3}>
          <Flex justifyContent='center' alignItems='center'>
            <Heading>React related topics!</Heading>
          </Flex>
          <Topic topicName='react' />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
