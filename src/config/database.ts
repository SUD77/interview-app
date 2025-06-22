import { Sequelize } from "sequelize";

// Use environment variables for production safety!
const dbHost = process.env.DB_HOST as string;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5434;
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;

// Create a new Sequelize instance
export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  logging: process.env.NODE_ENV === "production" ? false : console.log,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Function to test the DB connection
export async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1); // Stop the app if DB is unreachable
  }
}
