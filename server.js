const http = require('http');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')


require('dotenv').config({path: __dirname + '/.env'})
require('./models/User')

app.use(cors());

mongoose
  .connect(
    process.env['MongoURI'],{useUnifiedTopology: true,useNewUrlParser: true}
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server up and running on port ${port}`));