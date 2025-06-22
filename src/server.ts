import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { testDbConnection } from "./config/database";
import { syncDb } from "./models";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables.");
}

async function startServer() {
  await testDbConnection();
  await syncDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
