// before database*********************************************************************************************

// import bookData from "../../Data/books.json" assert { type: "json" };
// import NotFoundError from "../../Errors/NotFoundError.js";

// const deleteBook = (id) => {
//   const index = bookData.books.findIndex((book) => book.id === id);
//   if (index === -1) {
//     throw new NotFoundError("Book", id);
//   }

//   bookData.books.splice(index, 1);
//   return id;
// };

// export default deleteBook;
// after database*********************************************************************************************

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const deleteBook = async (id) => {
  const prisma = new PrismaClient();

  const deleteBook = await prisma.book.deleteMany({
    where: { id },
  });

  if (!deleteBook || deleteBook.count === 0) {
    throw new NotFoundError("Book", id);
  }
  return id;
};

export default deleteBook;
