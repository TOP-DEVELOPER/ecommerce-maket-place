const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");

// app
const app = express();

const port = process.env.PORT || 8001;


// db
mongoose
    .connect(process.env.mongodb_uri, {
        useNewUrlParser: true,
        useCreateIndex: true
    }|| "mongodb://user:password>@ds141188.mlab.com:41188/heroku_vpklbm6m")
    

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const path = require('path');
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }
  
  // Send every request to the React app
  // Define any API routes before this runs
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

