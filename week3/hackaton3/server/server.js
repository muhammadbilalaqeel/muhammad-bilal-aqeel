const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 9000;
const app = express();
dotenv.config();

// Routes
app.use("/api", userRoutes);



// DB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
