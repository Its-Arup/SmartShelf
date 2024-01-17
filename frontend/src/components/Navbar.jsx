import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutUser } from "../redux/auth/action";
function Navbar() {

  const user = useSelector((store) => store.authReducer);

  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(logoutUser(toast))
  }

  return (
    <Flex
      p={3}
      px={5}
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
      {!user.isLoggedIn && <Box>
        <ChakraLink as={ReactRouterLink} to="/login">
          Login
        </ChakraLink>
      </Box>}
      <Spacer />
      { !user.isLoggedIn && <Box>
        <ChakraLink as={ReactRouterLink} to="/signup">
          Signup
        </ChakraLink>
      </Box>}
      { user.isLoggedIn && <Box>
        <Button colorScheme="blue" onClick={handleLogout}>Logout</Button>
      </Box>}
    </Flex>
  );
}

export default Navbar;
