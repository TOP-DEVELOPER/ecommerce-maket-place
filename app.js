const { errorHandler } = require("./helpers/dbErrorHandler");
const dbConnection = require("./helpers/dbConnection");
const expressValidator = require("express-validator");
const express = require("express");
const morgan = require("morgan");
require("express-async-errors");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Database Connection
dbConnection();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/products", require("./routes/product"));
app.use("/api/braintree", require("./routes/braintree"));

// Error handling middleware
app.use(function(err, req, res, next) {
  console.log(err);
  return res.status(500).json({
    error: errorHandler(err) || "Something went wrong!"
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server initialization
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});