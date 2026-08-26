require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Student Notes Manager API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.warn(`Port ${PORT} is in use, trying ${PORT + 1}...`);
    app.listen(PORT + 1, () => {
      console.log(`Server running on port ${PORT + 1}`);
    });
  } else {
    throw err;
  }
});
