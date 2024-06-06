import mysql from "mysql2/promise";

let dbconnection;

export async function connectDB() {
  if (!dbconnection) {
    try {
      dbconnection = await mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      console.log("Database connected");
    } catch (error) {
      console.error("Database connection failed:", error.message);
      throw new Error("Database connection failed");
    }
  }
}

export async function disconnectDB() {
  if (dbconnection) {
    try {
      await dbconnection.end();
      console.log("Database connection closed");
      dbconnection = null;
    } catch (error) {
      console.error("Error closing the database connection:", error.message);
      throw new Error("Error closing the database connection");
    }
  }
}

export function getConnection() {
  if (!dbconnection) {
    throw new Error("Database not connected");
  }
  return dbconnection;
}

export async function query({ query, values = [] }) {
  const connection = await dbconnection.getConnection();

  try {
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    console.error("Database query failed:", error.message);
    throw new Error(error.message);
  } finally {
    connection.release();
    console.log("Connection %d released", connection.threadId);
  }
}
