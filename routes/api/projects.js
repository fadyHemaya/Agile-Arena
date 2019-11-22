const express = require("express");
const router = express.Router();
const project = require('../../models/Project')
var cors = require('cors')

router.use(cors())

router.post('/', (req,res)=>{

    req.userData.id = '4d3ed089fb60ab534684b7ff'

    // console.log('=====>' , req.userData)
    const squad = [req.userData.id]
    const item = new project({
        name: req.body.name,
        owner: req.userData.id,
        description: req.body.description,
        team: JSON.parse(JSON.stringify(squad))
    })
    item
      .save()
      .then(newItem => res.status(200).json({
          message: 'item added successfully',
          item: newItem
      }))
      .catch(err => res.status(400).json({error: 'failed to add item'}));
    
})





module.exports = router;
