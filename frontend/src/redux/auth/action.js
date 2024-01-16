import axios from "axios";
import { LOGIN_USER_FALIURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from "./actionType";

const Base_URL = import.meta.env.VITE_BASE_URL








// ------- Login user function ---------

export const loginUser = (data, toast) => (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    axios
      .post(`${Base_URL}/login`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Login Successful !", {
          theme: "colored",
          autoClose: 3000,
        });
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
        
      })
      .catch((err) => {
        toast.error(err.message, {
          theme: "colored",
          autoClose: 3000,
        });
        dispatch({ type: LOGIN_USER_FALIURE });
      });
  };