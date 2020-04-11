const express = require('express');
const path = require('path');
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
  }
  
  // Send every request to the React app
  // Define any API routes before this runs


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
