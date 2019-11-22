const http = require('http');
const express = require("express");
const app = express();
const mongoose = require("mongoose");


const project = require('./routes/api/projects')

require('dotenv').config({path: __dirname + '/.env'})

mongoose
  .connect(
    process.env['MongoURI']
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use('/api/project', project)
app.use((req, res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));