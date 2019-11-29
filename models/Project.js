const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema({

  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description:{
    type:String,
    required:false
  },
  team: [{
    userID: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      activated:Boolean
  }]

})
module.exports = mongoose.model('Projects', Project)