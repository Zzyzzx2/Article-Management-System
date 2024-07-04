import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import StoreProvider from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/books/create"
          element={<PrivateRoute element={CreateBook} />}
        />
        <Route
          path="/books/delete/:id"
          element={<PrivateRoute element={DeleteBook} />}
        />
        <Route
          path="/books/edit/:id"
          element={<PrivateRoute element={EditBook} />}
        />
        <Route
          path="/books/show/:id"
          element={<PrivateRoute element={ShowBook} />}
        />
      </Routes>
      <ToastContainer />
    </StoreProvider>
  );
};

export default App;
