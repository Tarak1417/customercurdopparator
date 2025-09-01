const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./customerDB.sqlite", (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database");

    // Customer Table
    db.run(`CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT NOT NULL,
      city TEXT,
      state TEXT,
      pincode TEXT
    )`);

    // Address Table
    db.run(`CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId INTEGER,
      address TEXT NOT NULL,
      city TEXT,
      state TEXT,
      pincode TEXT,
      FOREIGN KEY (customerId) REFERENCES customers(id)
    )`);
  }
});

module.exports = db;
