import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/auth";

const initialState = {
  token: localStorage.getItem("token"),
  firstname: localStorage.getItem("firstname"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        firstname: action.payload.firstname,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        firstname: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
