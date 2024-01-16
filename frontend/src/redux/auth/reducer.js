import {
  LOGIN_USER_FALIURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
} from "./actionType";

const initState = {
  user: {},
  token: "",
  loading: false,
  error: false,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_REQUEST:
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
        error: false,
      };
    case LOGIN_USER_FALIURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};
