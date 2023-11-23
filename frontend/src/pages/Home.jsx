import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../Components/home/BooksTable";
import BooksCard from "../Components/home/BooksCard";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState([]);
  const [showType, setShowType] = useState(() => {
    const localValue = localStorage.getItem("ShowType");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://article-management-api.vercel.app/books/")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("ShowType", JSON.stringify(showType));
    if (showType === "" || showType === "table") {
      setShowType("table");
    } else setShowType("card");
  }, [showType]);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-400 hover:bg-sky-200 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-400 hover:bg-sky-200 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-center items-center gap-x-4"></div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
