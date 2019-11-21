const http = require('http');
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require('dotenv').config({path: __dirname + '/.env'})

mongoose
  .connect(
    process.env['MongoURI'],{useUnifiedTopology: true,useNewUrlParser: true}
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server up and running on port ${port}`));