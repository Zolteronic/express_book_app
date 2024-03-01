import express from "express";
import getBooks from "../Services/Books/getBooks.js";
import getBooksById from "../Services/Books/getBooksById.js";
import createBook from "../Services/Books/createBook.js";
import updateBookById from "../Services/Books/updateBookById.js";
import deleteBook from "../Services/Books/deleteBooks.js";
import checkJwt from "../Middleware/advancedAuth.js";
import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    const { genre, available } = req.query;
    const books = await getBooks(genre, available);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await getBooksById(id);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.post(`/`, authMiddleware, async (req, res, next) => {
  const { title, author, isbn, pages, available, genre } = req.body;
  const newBook = await createBook(
    title,
    author,
    isbn,
    pages,
    available,
    genre
  );
  res.status(201).json(newBook);
});

router.put(
  `/:id`,
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, author, isbm, pages, available, genre } = req.body;
      const updatedBook = await updateBookById(
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
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBookId = await deleteBook(id);

      res.status(200).json({
        message: `Book with id ${deletedBookId} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
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
