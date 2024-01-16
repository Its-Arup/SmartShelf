import React from 'react'
import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react'

function Signup() {
  return (
    <Box
    maxW={{ base: "90%", md: "500px" }}
    mx="auto"
    mt={8}
    p={8}
    borderWidth="1px"
    borderRadius="md"
    boxShadow="lg"
  >
    <Heading mb={4} textAlign="center">
      Register Now
    </Heading>
    <form >
      <Stack spacing={4}>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button type="submit" colorScheme="blue" width="full">
          Signup
        </Button>
      </Stack>
    </form>
  </Box>
  )
}

export default Signup
