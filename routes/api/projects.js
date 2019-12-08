const express = require("express");
const router = express.Router();
const project = require("../../models/Project");
const user = require("../../models/User");
var cors = require("cors");
const Tasks =require("../../models/Task")
const auth = require("../auth");
const mailer = require('../mail')
router.use(cors());



router.get('/GetTasksOfProject', auth.required, async (req, res, next) => {
  const {
    payload: { id }
  } = req;
  const projectID = req.query.projectID;
  const proj = await project.findById(projectID)
  let EUser = await proj.team.find(o => o.userID === id && o.activated === true);
  if (EUser) {
    return res.status(422).json({
      errors:
        'Unauthorized'
    });
  }

  let Utasks = await Tasks.find({ projectID: projectID })
  if (Utasks)
    return res.status(200).json( Utasks )
  else
    return res.status(422).json({ Error: 'Can not find task' })
})

router.post("/", auth.required, (req, res) => {
  const {
    payload: { id }
  } = req;

  const squad = [{ "userID": id, "activated": true }];
  const item = new project({
    name: req.body.name,
    owner: id,
    description: req.body.description,
    team: squad
  });
  item
    .save()
    .then(newItem =>
      res.status(200).json({
        message: "item added successfully",
        item: newItem
      })
    )
    .catch(err => res.status(400).json({ error: "failed to add item" }));
});

router.delete("/", auth.required, async (req, res) => {


  const projectID = req.query.projectID;
  const {
    payload: { id }
  } = req;

  const proj = await project.findOne({ _id: projectID });
  if (!proj) {
    res.status(401).json({
      message: "project not found"
    });
  } else {
    if (proj.owner == id) {
      await project.findByIdAndDelete(proj._id);
      res.status(200).json({
        message: "deleted successfully",
        project: proj
      });
    } else {
      res.status(401).json({
        message: "unauthorised"
      });
    }
  }
});

// router.post('/user' , (req,res)=>{
//     const item = new user({
//         firstName: 'ramy',
//         lastName: 'gabra',
//         email: 'email',
//         password: 'password'
//     })
//     item.save().then(newItem => res.status(200).json({
//         message: 'item added successfully',
//         item: newItem
//     }))
//     .catch(err => res.status(400).json({error: 'failed to add item'}));
// })

module.exports = router;
