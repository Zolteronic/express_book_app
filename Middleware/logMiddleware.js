import express from "express";
import logging from "../Utils/Log.js";

const log = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;

  logging.info(
    `${req.method} ${req.originalUrl}. status: ${res.statusCode}. Duration: ${ms}ms`
  );
};

export default log;
