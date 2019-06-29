import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
const pretty = require("express-prettify");
import cors from "cors";
import Env from "./env";
import movieRouter from "./router/movieRouter";
import errorHandler from "./errorHandler";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pretty({ query: "pretty" }));
if (Env.NODE_ENV !== "production") app.use(cors());

// Logging
if (Env.NODE_ENV === "production") app.use(morgan("combined"));

// Registering routes
movieRouter(app);

app.use(errorHandler);

export default app;