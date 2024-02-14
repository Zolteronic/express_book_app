import bookData from "../../Data/books.json" assert { type: "json" };

const getBooksById = (id) => {
  return bookData.books.find((book) => book.id === id);
};

export default getBooksById;
