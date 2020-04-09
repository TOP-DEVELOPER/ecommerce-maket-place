const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

// app.use(compression());
// app.use(express.static(path.join(__dirname, '/client/build')));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
