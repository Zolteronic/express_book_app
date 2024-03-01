//before database*********************************************************************************************

// import bookData from "../../Data/books.json" assert { type: "json" };

// const getBooks = (genre, available) => {
//   let books = bookData.books;

//   if (genre) {
//     books = books.filter((book) => book.genre === genre);
//   }

//   if (available) {
//     books = books.filter((book) => book.available === JSON.parse(available));
//   }

//   return books;
// };

// export default getBooks;

//after database*********************************************************************************************
import { PrismaClient } from "@prisma/client";

const getBooks = async (genre, available) => {
  const prisma = new PrismaClient();

  return prisma.book.findMany({
    where: {
      genre,
      available,
    },
  });
};

export default getBooks;
