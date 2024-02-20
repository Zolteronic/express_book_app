import express from "express";
import getBooks from "../Services/Books/getBooks.js";
import getBooksById from "../Services/Books/getBooksById.js";
import createBook from "../Services/Books/createBook.js";
import updateBookById from "../Services/Books/updateBookById.js";
import deleteBook from "../Services/Books/deleteBooks.js";
import checkJwt from "../Middleware/advancedAuth.js";
import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";

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

router.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const book = getBooksById(id);
    res.status(200).json(book);
  },
  NotFoundErrorHandler
);

router.post(
  `/`,
  checkJwt,
  (req, res) => {
    const { title, author, isbn, pages, available, genre } = req.body;
    const newBook = createBook(title, author, isbn, pages, available, genre);
    res.status(201).json(newBook);
  },
  NotFoundErrorHandler
);

router.put(
  `/:id`,
  checkJwt,
  (req, res) => {
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
  },
  NotFoundErrorHandler
);

router.delete(
  "/:id",
  checkJwt,
  (req, res, next) => {
    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    res.status(200).json({
      message: `Book with id ${deletedBookId} has been deleted`,
    });
  },
  NotFoundErrorHandler
);

router.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
  } else {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
