import app from "./app";
import Env from "./env";

/**
 * Start Express server.
 */
const server = app.listen(3000, () => {
  console.log(
    "App is running at http://localhost:3000/movies in %s mode. API documentation here %s",
    Env.NODE_ENV,
    "https://documenter.getpostman.com/view/7984062/S1a7UQdT?version=latest"
  );
});

export default server;