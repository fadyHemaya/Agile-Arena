const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sprint = new Schema({
 
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },

  projectID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Project',
    required:true
  },
  name:{
      type:String,
      required:true
  },
  active:{
      type: Boolean,
      default: false
  },
})
module.exports = mongoose.model('Sprints', Sprint)