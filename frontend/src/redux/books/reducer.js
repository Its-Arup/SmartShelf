import { ADD_BOOK_SUCCESS, DELETE_BOOK_SUCCESS, GET_BOOK_SUCCESS } from "./actionType";

const initState = {
  books: [],
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        books: [...state.books, payload],
      };
    case GET_BOOK_SUCCESS:
      return {
        ...state,
        books: [...payload],
      };
    case DELETE_BOOK_SUCCESS :
      return {
        books : state.books.filter((ele)=> ele._id != payload.bookId)
      }
    default:
      return {
        ...state,
      };
  }
};
