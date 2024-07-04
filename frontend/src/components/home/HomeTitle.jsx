// src/components/HomeTitle.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const HomeTitle = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
        <div className="text-2xl font-bold text-gray-800 font-serif">
          Books Trove
        </div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-2xl hover:bg-blue-700 transition duration-300"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </header>
    </div>
  );
};

export default HomeTitle;
