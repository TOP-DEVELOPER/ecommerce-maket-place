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
const router = require("express").Router();

const path = require("path");

// app
const app = express();

const port = process.env.PORT || 8000;


// // Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// // Serve up static assets (usually on heroku)


// // router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// db
// Connect to the Mongo DB
// mongoose.connect("process.env.MONGODB_URI" || 
// // "mongodb://dbuser:dbpassword12@ds117681.mlab.com:17681/heroku_l6bmw9sj", 
// "mongodb://localhost/ecommerce",
// { useNewUrlParser: true });

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

});

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


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
  
};

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});