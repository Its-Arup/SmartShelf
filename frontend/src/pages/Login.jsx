import React, { useState } from "react";
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../redux/auth/action";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const user = useSelector((store) => store.authReducer);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData, toast));
    setUserData({
      email: "",
      password: "",
    });
  };

  if (user.isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  
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
      <ToastContainer autoClose={3000} />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input
            type="email"
            placeholder="johndoe@gmail.com"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="*********"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
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
