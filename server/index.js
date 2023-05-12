require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//const connection = require("./db");
const connectToDatabase = require("./helpers/connect-to-database");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const manageFileRoutes = require("./routes/xlsxManager");

// database connection
//connection();
connectToDatabase();
// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/managFile", manageFileRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server started on : http://localhost:${port}`)
);
