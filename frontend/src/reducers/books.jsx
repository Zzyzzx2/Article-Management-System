import { SEARCH_BOOKS_SUCCESS } from "../actions/searchbooks";

const initialState = {
  books: [],
  searchResults: [],
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BOOKS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default booksReducer;
