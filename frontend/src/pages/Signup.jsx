import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../redux/auth/action";

function Signup() {
  const [userData, setUsserData] = useState({
    userName: "",
    email: "",
    password: "",
    role: [],
  });
  
  const user = useSelector((store) => store.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      if (!userData.role.includes(e.target.value)) {
        setUsserData((prev) => {
          return {
            ...prev,
            role: [...prev.role, e.target.value],
          };
        });
      } else {
        const updaatedRole = userData.role.filter((ele) => {
          return ele != e.target.value;
        });
        setUsserData((prev) => {
          return {
            ...prev,
            role: [...updaatedRole],
          };
        });
      }
    } else {
      setUsserData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(userData, toast));
    setUsserData({
      userName: "",
      email: "",
      password: "",
      role: [],
    });
    navigate("/login");
  };

  if (user.isLoggedIn) {
    return <Navigate to={"/"} />;
  }

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
      <ToastContainer autoClose={3000} />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Enter Username</FormLabel>
            <Input
              type="text"
              placeholder="John Doe"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Enter Email</FormLabel>
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Enter Password</FormLabel>
            <Input
              type="password"
              placeholder="*********"
              value={userData.password}
              name="password"
              onChange={handleChange}
            />
            <FormHelperText>Password must contain one uppercase letter and one number</FormHelperText>
          </FormControl>
          <FormLabel>Role</FormLabel>
          <Stack spacing={5} direction="col">
            <Checkbox
              colorScheme="blue"
              value={"CREATOR"}
              onChange={handleChange}
            >
              CREATOR
            </Checkbox>
            <Checkbox
              colorScheme="blue"
              value={"VIEWER"}
              onChange={handleChange}
            >
              VIEWER
            </Checkbox>
            <Checkbox
              colorScheme="blue"
              value={"VIEW_ALL"}
              onChange={handleChange}
            >
              VIEW_ALL
            </Checkbox>
          </Stack>

          <Button type="submit" colorScheme="blue" width="full">
            Signup
          </Button>
        </Stack>
      </form>
      <Text fontSize="sm" mt={4}>
        Already have account | <Link to="/login">Login</Link>
      </Text>
    </Box>
  );
}

export default Signup;
