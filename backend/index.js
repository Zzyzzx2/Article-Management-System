import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";
import authrouter from "./routes/auth.js";
import cors from "cors";
import "dotenv/config";
import router from "./routes/bookRoutes.js";
import airouter from "./routes/ai.js";

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODBURL;
const app = express();

//Middleware for parsing data
app.use(express.json());

//Option 1: Allow All Origins w/ default of cors(*)
app.use(cors());
//Option 2: Use custom headers
// app.use(
//   cors({
//     origin: "https://article-management-frontend.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

//GET Method for HomePage
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Book management System");
});

app.use("/books", router);
app.use("/auth", authrouter);
app.use("/ai", airouter);
// Search
app.get("/api/books/search/:title", async (req, res) => {
  const { title } = req.params;
  console.log("Search for: " + title);
  try {
    const books = await Book.find({ title: new RegExp(title, "i") }); // Adjust based on your database query method
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
