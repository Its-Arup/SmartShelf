import {
  CREATE_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  UPDATE_USER_ROLE,
  USER_FALIURE,
  USER_REQUEST,
} from "./actionType";

const initState = {
  user: {},
  token: localStorage.getItem("token") || "",
  isLoggedIn: false,
  loading: false,
  error: false,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true,
        error: false,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
        error: false,
      };
    case USER_FALIURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case LOGOUT_USER_SUCCESS:
      return initState;

    case UPDATE_USER_ROLE:
      return {
        ...state,
        user: payload.user,
      };
    default:
      return {
        ...state,
      };
  }
};
