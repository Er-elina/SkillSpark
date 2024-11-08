const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 3000;
const connectDB = require("./src/config/db");

app.use(express.json());
app.use(cors());
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(__dirname + "/uploads"));

connectDB();

const userRoutes = require("./src/routes/userRoutes");
app.use("/api/user", userRoutes);
app.use("/api/profile", require("./src/routes/profileRoutes"));
app.use("/api/category", require("./src/routes/categoryRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});