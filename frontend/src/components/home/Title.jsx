// src/components/Title.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../actions/auth";

const Title = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const firstname = useSelector((state) => state.auth.firstname);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
        <div className="text-2xl font-bold text-gray-800 font-serif">
          ThoughtsExchange
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <span className="text-gray-700">Hi, {firstname}</span>
          )}
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-2xl hover:bg-blue-700 transition duration-300"
            onClick={() => {
              if (isAuthenticated) {
                dispatch(logoutUser());
              }
              navigate("/login");
            }}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Title;
