const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const addressRoutes = require("./routes/addressRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Mount Routes
app.use("/customers", customerRoutes);
app.use("/customers", addressRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});

// POST /customers → create customer

// GET /customers → get all

// GET /customers/:id → get one with addresses

// PUT /customers/:id → update

// DELETE /customers/:id → delete

// POST /customers/:id/addresses → add address

// GET /customers/search?city=Hyderabad → search