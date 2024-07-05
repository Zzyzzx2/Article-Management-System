import React, { useState, useRef, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../config";
import { toast } from "react-toastify";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);
        if (quillRef.current) {
          quillInstance.current.root.innerHTML = response.data.moreInfo;
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Occurred, Please Check Console");
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });
    }
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      moreInfo: quillRef.current.querySelector(".ql-editor").innerHTML, // Getting the HTML content from Quill
    };
    setLoading(true);
    axios
      .put(`${backendUrl}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
        toast.success("Book Successfully Edited!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("An error happened. Please Check console");
        console.log(error);
      });
  };

  const handleGetSuggestions = async () => {
    const textContent = quillRef.current.querySelector(".ql-editor").innerText;

    if (title.trim() && textContent.trim()) {
      setLoading(true);
      toast.dismiss(); // Clear existing notifications
      try {
        const response = await axios.post(`${backendUrl}/ai/search`, {
          title,
          text: textContent,
        });

        const suggestions = response.data.suggestions;
        suggestions.forEach((suggestion, index) => {
          toast.info(`Suggestion: ${suggestion.text}`, {
            autoClose: false,
            position: "top-right",
          });
        });
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        toast.error("Failed to fetch suggestions. Please check console.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Title and Content cannot be empty");
    }
  };

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            disabled
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Content</label>
          <div
            ref={quillRef}
            className="border-2 border-gray-500 px-4 py-2 w-full min-h-[200px]"
          ></div>
        </div>
        <button
          className="p-2 bg-yellow-300 m-8"
          onClick={handleGetSuggestions}
        >
          Get AI Suggestions
        </button>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
