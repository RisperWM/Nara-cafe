const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const menuRoutes = require("./src/routes/menuRoutes")
const orderRoutes = require("./src/routes/orderRoutes")

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes)
app.use("/api/orders", orderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
