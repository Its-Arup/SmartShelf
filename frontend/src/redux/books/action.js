import axios from "axios";
import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
  EDIT_BOOK_SUCCESS,
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
    .catch((err) => {});
};

export const GetBooks = (params) => (dispatch) => {
  axios({
    method: "get",
    url: `${Base_URL}/books`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    params: params,
  })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_BOOK_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const DeleteBook = (id, toast) => (dispatch) => {
  axios({
    method: "delete",
    url: `${Base_URL}/books/delete/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((res) => {
      toast.success(res.data.message, {
        theme: "colored",
        autoClose: 3000,
      });
      dispatch({ type: DELETE_BOOK_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      toast.error(err.message, {
        theme: "colored",
        autoClose: 3000,
      });
    });
};

export const EditBook = (id, payload, toast) => (dispatch) => {
  axios({
    method: "PATCH",
    url: `${Base_URL}/books/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    data: payload,
  }).then((res) => {
    toast.success(res.data.message, {
      theme: "colored",
      autoClose: 3000,
    });
    dispatch({ type: EDIT_BOOK_SUCCESS, payload: res.data });
  })
  .catch((err) => {
    toast.error(err.message, {
      theme: "colored",
      autoClose: 3000,
    });
  })
};
