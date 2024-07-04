import axios from "axios";
import { backendUrl } from "../config";
import { toast } from "react-toastify";
// Action Types
export const SEARCH_BOOKS_SUCCESS = "SEARCH_BOOKS_SUCCESS";

// Action Creators
export const searchBooksSuccess = (books) => ({
  type: SEARCH_BOOKS_SUCCESS,
  payload: books,
});

// Async Action: Search Books
export const searchBooks = (query) => async (dispatch) => {
  try {
    const response = await axios.get(`${backendUrl}/api/books/search/${query}`);
    dispatch(searchBooksSuccess(response.data));
  } catch (error) {
    console.error("Search failed:", error);
    // toast.error("Search Failed, Try Again");
    // Handle error (e.g., show error message)
  }
};
