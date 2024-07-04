import { combineReducers } from "redux";
import authReducer from "./auth";
import booksReducer from "./books";

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
});

export default rootReducer;
