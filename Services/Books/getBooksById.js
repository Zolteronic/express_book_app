// voor database*********************************************************************************************

// import bookData from "../../Data/books.json" assert { type: "json" };
// import NotFoundError from "../../Errors/NotFoundError.js";

// const getBooksById = (id) => {
//   const book = bookData.books.find((book) => book.id === id);

//   if (!book) {
//     throw new NotFoundError("Book", id);
//   } else {
//     return book;
//   }
// };

// export default getBooksById;
// na database*********************************************************************************************

import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const getBooksById = async (id) => {
  const prisma = new PrismaClient();

  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw new NotFoundError("Book", id);
  } else {
    return book;
  }
};

export default getBooksById;
