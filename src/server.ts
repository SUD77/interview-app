import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { testDbConnection } from "./config/database";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables.");
}

async function startServer() {
  await testDbConnection();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
