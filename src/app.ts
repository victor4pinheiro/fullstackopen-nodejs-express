import express from "express";
import { router } from "./routes";
import cors from "cors";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(router);
app.use(cors);

morgan.token("body", function (request) {
  return JSON.stringify(request["body"]);
});

export { app };
