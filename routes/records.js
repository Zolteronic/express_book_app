import express from "express";
import getRecords from "../Services/records/getRecords.js";
import createRecord from "../Services/records/createRecord.js";
import deleteRecords from "../Services/records/deleteRecords.js";
import getRecordById from "../Services/records/getRecordById.js";
import updateRecordById from "../Services/records/updateRecordById.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { artist, genre, available } = req.query;
    const records = getRecords(artist, genre, available);
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", authMiddleware, (req, res) => {
  try {
    const { title, artist, year, available, genre } = req.body;
    const newRecord = createRecord(title, artist, year, available, genre);
    res.status(200).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const records = deleteRecords(id);
    if (records === null) {
      res.status(404).send("Record not found");
    } else {
      res.status(200).json(records);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const record = getRecordById(id);
    if (record === null) {
      res.status(404).send("Record not found");
    } else {
      res.status(200).json(record);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, year, available, genre } = req.body;
    const updatedRecord = updateRecordById(
      id,
      title,
      artist,
      year,
      available,
      genre
    );
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
