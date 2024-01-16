import axios from "axios";
import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
  GET_BOOK_SUCCESS,
} from "./actionType";
const Base_URL = import.meta.env.VITE_BASE_URL;

const Token = localStorage.getItem("token");

export const AddBook = (data) => (dispatch) => {
  dispatch({ type: ADD_BOOK_REQUEST });
  axios({
    method: "POST",
    url: `${Base_URL}/books`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    data: data,
  })
    .then((res) => {
      dispatch({ type: ADD_BOOK_SUCCESS, payload: res.data.books });
    })
    .catch((err) => {
     
    });
};

export const GetBooks = (params) => (dispatch) => {
  axios({
    method: "GET",
    url: `${Base_URL}/books`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    params: params,
  })
    .then((res) => {
      dispatch({ type: GET_BOOK_SUCCESS, payload: res.data.allBooks });
    })
    .catch((err) => {
    });
};

export const DeleteBook = (id) => (dispatch) => {
  axios({
    method: "DELETE",
    url: `${Base_URL}/books/delete/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  })
  .then((res)=>{
    dispatch({type : DELETE_BOOK_SUCCESS, payload : res.data})
  })
  .catch((err)=>{
    console.log(err);
  })
};
