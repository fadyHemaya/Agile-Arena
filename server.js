
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors')


require('dotenv').config({path: __dirname + '/.env'})
 require('./models/User')
// require('./config/passport')
app.use('/fady' ,(req, res) => {
  res.send('<h1> Hello world</h1>')
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));
// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });


mongoose
  .connect(
    process.env['MongoURI'],
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server up and running on port ${port}`));