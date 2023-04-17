const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 6000;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${6000}`);
});
