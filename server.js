// Load environment variables from .env
import "dotenv/config";

import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

async function startServer() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("✅ Connected to the database:", config.mongoUri);
  } catch (err) {
    console.error("❌ Could not connect to the database:", err.message);
    // We do NOT throw here, so the server can still start
    // and you can work on the app even if the DB is not ready.
  }

  mongoose.connection.on("error", (err) => {
    console.error("❌ Database connection error:", err.message);
  });

  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info(`🚀 Server started on port ${config.port}.`);
  });
}

startServer();
