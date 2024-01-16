import React from "react";
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Login() {
  return (
    <Box
      maxW={{ base: "90%", md: "400px" }}
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading mb={4} textAlign="center">
        Login
      </Heading>
      <form>
        <Stack spacing={4}>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" colorScheme="blue" width="full">
            Log in
          </Button>
        </Stack>
      </form>
      <Text fontSize="sm" mt={4}>
        Don't have account | <Link to="/signup">Signup</Link>
      </Text>
    </Box>
  );
}

export default Login;
