import { sequelize } from "../config/database";
import { User } from "./User";
import { PracticeSet } from "./PracticeSet";
import { Question } from "./Question";
import { Option } from "./Option";

// Export all models
export { sequelize, User, PracticeSet, Question, Option };

// Function to sync all models with DB
export async function syncDb() {
  await sequelize.sync({ alter: true }); // Use { force: true } to drop & recreate (dev only)
  console.log("✅ All models synced with the database.");
}
