import express from "express";
require("dotenv").config();
import { router } from "./routes";
import cors from "cors";
import morgan from "morgan";
import handleError from "./middleware/errors";
const app = express();

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(router);
app.use(express.static("build"));
app.use(cors);

morgan.token("body", function (request) {
  return JSON.stringify(request["body"]);
});

app.use(handleError);

export { app };
