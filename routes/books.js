import express from "express";
import getBooks from "../Services/Books/getBooks.js";
import getBooksById from "../Services/Books/getBooksById.js";
import createBook from "../Services/Books/createBook.js";
import updateBookById from "../Services/Books/updateBookById.js";
import deleteBooks from "../Services/Books/deleteBooks.js";

const router = express.Router();

router.get(`/`, (req, res) => {
  try {
    const { genre, available } = req.query;
    const books = getBooks(genre, available);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const book = getBooksById(id);

    if (!book) {
      res.status(404).send(`Bool with id ${id} not found`);
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(`/`, (req, res) => {
  try {
    const { title, author, isbn, pages, available, genre } = req.body;
    const newBook = createBook(title, author, isbn, pages, available, genre);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put(`/:id`, (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbm, pages, available, genre } = req.body;
    const updatedBook = updateBookById(
      id,
      title,
      author,
      isbm,
      pages,
      available,
      genre
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete(`/:id`, (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookId = deleteBooks(id);

    if (!deletedBookId) {
      res.status(404).send(`Book with id ${id} not found`);
    } else {
      res.status(200).send(`Book with id ${id} has been deleted`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
