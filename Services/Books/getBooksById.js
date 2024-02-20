import bookData from "../../Data/books.json" assert { type: "json" };
import NotFoundError from "../../Errors/NotFoundError.js";

const getBooksById = (id) => {
  const book = bookData.books.find((book) => book.id === id);

  if (!book) {
    throw new NotFoundError("Book", id);
  } else {
    return book;
  }
};

export default getBooksById;
