import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
function Navbar() {
  return (
    <Flex p={3} pr={5} boxShadow="lg" bg="white" alignItems="center" justifyContent={"space-between"} width={"550px"}>
      <Box>
      <ChakraLink as={ReactRouterLink} to="/">
        Library
      </ChakraLink>
      </Box>
      <Box>
      <ChakraLink as={ReactRouterLink} to="/login">
        Login
      </ChakraLink>
      </Box>
      <ChakraLink as={ReactRouterLink} to="/signup">
        Signup
      </ChakraLink>
    </Flex>
  );
}

export default Navbar;
