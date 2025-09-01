const express = require("express");
const db = require("../db");
const router = express.Router();

// Create Customer
router.post("/", (req, res) => {
  const { firstName, lastName, phone, city, state, pincode, address } = req.body;

  if (!firstName || !lastName || !phone || !address || !city || !state || !pincode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    `INSERT INTO customers (firstName, lastName, phone, city, state, pincode) VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, phone, city, state, pincode],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      const customerId = this.lastID;
      db.run(
        `INSERT INTO addresses (customerId, address, city, state, pincode) VALUES (?, ?, ?, ?, ?)`,
        [customerId, address, city, state, pincode]
      );

      res.json({ message: "Customer created successfully", customerId });
    }
  );
});

// Get all customers
router.get("/", (req, res) => {
  db.all(`SELECT * FROM customers`, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Get single customer + addresses
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM customers WHERE id = ?`, [id], (err, customer) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    db.all(`SELECT * FROM addresses WHERE customerId = ?`, [id], (err, addresses) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ ...customer, addresses });
    });
  });
});

// Update customer
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, city, state, pincode } = req.body;

  db.run(
    `UPDATE customers SET firstName=?, lastName=?, phone=?, city=?, state=?, pincode=? WHERE id=?`,
    [firstName, lastName, phone, city, state, pincode, id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Customer updated successfully" });
    }
  );
});

// Delete customer + addresses
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM addresses WHERE customerId=?`, [id], (err) => {
    if (err) return res.status(400).json({ error: err.message });

    db.run(`DELETE FROM customers WHERE id=?`, [id], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Customer deleted successfully" });
    });
  });
});

module.exports = router;
