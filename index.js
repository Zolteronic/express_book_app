import express from "express";
import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";
import logMiddleware from "./Middleware/logMiddleware.js";
import loginRouter from "./routes/login.js";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import userRouter from "./routes/users.js";

import errorHandler from "./Middleware/errorHandler.js";
const app = express();

Sentry.init({
  dsn: "https://b8464e118426780d6a0ca54d5568e63c@o4506775762501632.ingest.sentry.io/4506775775150080",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(logMiddleware);

app.use(`/books`, booksRouter);
app.use(`/records`, recordsRouter);
app.use(`/login`, loginRouter);
app.use(`/users`, userRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
