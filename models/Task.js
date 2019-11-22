const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema({
 

//   type - Enum
//   Story, Bug, Task
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  points:{
    type:Number,
    required:false
  },
  priority:{
      type:Number,
      required:false
  },
  description:{
      type:String,
      required: false
  },
  creator:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  asignee:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, 
// Enum
// todo, in process, completed
  status:{
      type: String,
      required: false
  },
  dateCreated:{
      type: Date,
      required: true
  },
  dateFinished:{
    type: Date,
    required: false
  },
  projectID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Project'
  },
  sprintID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Sprint'
  }
  
  //still need to add sprint

})
module.exports = mongoose.model('Tasks', Task)