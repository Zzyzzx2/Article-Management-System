import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

//route to save a new Book - POST
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to GET All Books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to GET ONE Book from Database
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const books = await Book.findById(id);

    return response.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Update the Book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({
        message: "Book not found",
      });
    }

    return response.status(200).send({ message: "Book Updated Successfully" });
  } catch (err) {
    console.log(err);
    return response.status(500).send({ message: err.message });
  }
});

//Delete a Book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({
        message: "Book not found",
      });
    }
    return response.status(200).send({ message: "Book Deleted Successfully!" });
  } catch (err) {
    console.log(err);
    response.status(500).send({ message: err.message });
  }
});

export default router;
