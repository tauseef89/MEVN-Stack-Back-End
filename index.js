const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

// connect to db
mongoose.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);

// Import routes
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");

// Middlewares
app.use(express.json());
app.use(cors());

// route Middlewares
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 2000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
