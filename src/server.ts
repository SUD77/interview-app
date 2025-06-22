import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables.");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
