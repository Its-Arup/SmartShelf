import { Box, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
function Navbar() {
  return (
    <Flex
      p={3}
      boxShadow="lg"
      bg="white"
      alignItems="center"
      justifyContent={"space-between"}
      w="100%"
    >
      <Box>
        <ChakraLink as={ReactRouterLink} to="/">
          Library
        </ChakraLink>
      </Box>
      <Spacer />
      <Box>
        <ChakraLink as={ReactRouterLink} to="/login">
          Login
        </ChakraLink>
      </Box>
      <Spacer />
      <Box>
        <ChakraLink as={ReactRouterLink} to="/signup">
          Signup
        </ChakraLink>
      </Box>
    </Flex>
  );
}

export default Navbar;
