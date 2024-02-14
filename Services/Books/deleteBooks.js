import bookData from "../../Data/books.json" assert { type: "json" };

const deleteBooks = (id) => {
  const index = bookData.books.findIndex((book) => book.id === id);

  if (index === -1) {
    return null;
  }

  bookData.books.splice(index, 1);
  return id;
};

export default deleteBooks;
