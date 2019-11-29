
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors')


require('dotenv').config({ path: __dirname + '/.env' })
require('./models/User')
require('./models/Project')
require('./models/Sprint')
require('./models/Task')
require('./config/passport')


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));

mongoose
  .connect(
    process.env['MongoURI'],
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));