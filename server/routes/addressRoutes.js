const express = require("express");
const db = require("../db");
const router = express.Router();

// Add new address
router.post("/:id/addresses", (req, res) => {
  const { id } = req.params;
  const { address, city, state, pincode } = req.body;

  db.run(
    `INSERT INTO addresses (customerId, address, city, state, pincode) VALUES (?, ?, ?, ?, ?)`,
    [id, address, city, state, pincode],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Address added successfully", addressId: this.lastID });
    }
  );
});

// Search customers by city/state/pincode
router.get("/search", (req, res) => {
  const { city, state, pincode } = req.query;

  let query = `
    SELECT DISTINCT c.*
    FROM customers c
    LEFT JOIN addresses a ON c.id = a.customerId
    WHERE 1=1
  `;
  let params = [];

  if (city) {
    query += " AND (c.city LIKE ? OR a.city LIKE ?)";
    params.push(`%${city}%`, `%${city}%`);
  }
  if (state) {
    query += " AND (c.state LIKE ? OR a.state LIKE ?)";
    params.push(`%${state}%`, `%${state}%`);
  }
  if (pincode) {
    query += " AND (c.pincode LIKE ? OR a.pincode LIKE ?)";
    params.push(`%${pincode}%`, `%${pincode}%`);
  }

  db.all(query, params, (err, customers) => {
    if (err) return res.status(400).json({ error: err.message });
    if (customers.length === 0) return res.json([]);

    // fetch addresses for each customer
    let completed = 0;
    const results = [];

    customers.forEach((cust) => {
      db.all(`SELECT * FROM addresses WHERE customerId = ?`, [cust.id], (err, addresses) => {
        if (err) return res.status(400).json({ error: err.message });

        results.push({ ...cust, addresses });
        completed++;

        if (completed === customers.length) {
          res.json(results);
        }
      });
    });
  });
});

module.exports = router;
