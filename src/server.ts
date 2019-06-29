// import errorHandler from "errorhandler";

import app from "./app";
import Env from "./env";

/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(3000, () => {
  console.log(
    "\tApp is running at http://localhost:3000 in %s mode",
    Env.NODE_ENV
  );
  console.log("\tPress CTRL-C to stop\n");
});

export default server;