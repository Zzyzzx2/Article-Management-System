import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";

// Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// Action Creators
export const loginSuccess = (token, firstname) => ({
  type: LOGIN_SUCCESS,
  payload: { token, firstname },
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

// Async Action: Login User
export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    console.log("Attempting Log in ");
    const response = await axios.post(`${backendUrl}/auth/login`, userData);
    const { token, firstname } = response.data;
    localStorage.setItem("token", token); // Store token in localStorage
    localStorage.setItem("firstname", firstname);
    dispatch(loginSuccess(token, firstname));
    toast.success("Login successful!");
    navigate("/"); // Redirect to home page after login
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    console.error("Login failed:", error);
    toast.error(`Login failed. ${errorMessage}`);
  }
};

// Async Action: Sign Up User
export const signupUser = (userData, navigate) => async (dispatch) => {
  try {
    console.log("Attempting sign Up");
    const response = await axios.post(`${backendUrl}/auth/register`, userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    toast.success("Signup successful! Please login.");
    navigate("/login"); // Redirect to login page after signup
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    dispatch({ type: SIGNUP_FAILURE, payload: errorMessage });
    toast.error(`Signup failed. ${errorMessage}`);
  }
};

// Async Action: Logout User
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token"); // Remove token from localStorage
  localStorage.removeItem("firstname");
  dispatch(logoutSuccess());
  toast.info("Logged out successfully.");
};
