const express = require("express");
const router = express.Router();
const project = require("../../models/Project");
const user = require("../../models/User");
var cors = require("cors");

router.use(cors());

router.post("/", (req, res) => {
  req.userData = {
    id: "5dd8119aa5de5e51a8b47624"
  };

  // console.log('=====>' , req.userData)
  const squad = [req.userData.id];
  const item = new project({
    name: req.body.name,
    owner: req.userData.id,
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

router.delete("/:id", async (req, res) => {
  req.userData = {
    id: "5dd8119aa5de5e51a8b47624"
  };
  const userID = req.userData.id;

  const proj = await project.findOne({ _id: req.params.id });
  if (!proj) {
    res.json({
      message: "project not found"
    });
  } else {
    if (proj.owner == userID) {
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
