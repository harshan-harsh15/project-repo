const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT,
      email TEXT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Table ready");
}

createTable();

app.use(cors());
app.use(express.json());


app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Received:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    res.send("Message saved successfully");

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Error saving message");
  }
});


app.get("/health", (req, res) => {
    res.json({ status: "Backend is running!" });
});


app.get("/", (req, res) => {
    res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});