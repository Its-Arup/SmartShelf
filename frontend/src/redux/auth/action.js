import axios from "axios";
import { USER_FALIURE, USER_REQUEST, LOGIN_USER_SUCCESS, CREATE_USER_SUCCESS } from "./actionType";

const Base_URL = import.meta.env.VITE_BASE_URL


//  ------- Register user function -----------


export const registerUser = (data, toast) => (dispatch) => {  
    dispatch({ type: USER_REQUEST });
    axios
      .post(`${Base_URL}/register`, data)
      .then((res) => {
        toast.success(res.data.message, {
          theme: "colored",
          autoClose: 3000,
        });
        dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });

      })
      .catch((err) => {
        toast.error(err.message, {
          theme: "colored",
          autoClose: 3000,
        });
        dispatch({ type: USER_FALIURE });
      });
  };


// ------- Login user function ---------

export const loginUser = (data, toast) => (dispatch) => {
    dispatch({ type: USER_REQUEST });
    axios
      .post(`${Base_URL}/login`, data)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message, {
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
        dispatch({ type: USER_FALIURE });
      });
  };