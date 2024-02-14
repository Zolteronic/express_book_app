import express from "express";
import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";

const app = express();
app.use(express.json());

app.use(`/books`, booksRouter);
app.use(`/records`, recordsRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
