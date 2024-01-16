import React from "react";
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <Box
      maxW={{ base: "90%", md: "500px" }}
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading mb={4} textAlign="center">
        SignUp
      </Heading>
      <form>
        <Stack spacing={4}>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" colorScheme="blue" width="full">
            Signup
          </Button>
        </Stack>
      </form>
      <Text fontSize="sm" mt={4}>
        Already have account | <Link to="/">Login</Link>
      </Text>
    </Box>
  );
}

export default Signup;
