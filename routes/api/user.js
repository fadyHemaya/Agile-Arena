const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
const project = require("../../models/Project");
const mailer = require("../mail");

require("../../config/passport");

router.post("/signup", auth.optional, async (req, res, next) => {
  const user = req.body.user;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }
  const ExUser = await Users.findOne({ email: user.email.toLowerCase() });
  if (ExUser) return res.status(400).send("User already registered.");

  const finalUser = new Users(user);

  finalUser.setPassword("" + user.password);

  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post("/login", auth.optional, (req, res, next) => {
  const user = req.body.user;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.token });
      }

      return status(400).info;
    }
  )(req, res, next);
});

router.get("/current", auth.required, (req, res, next) => {
  const {
    payload: { id }
  } = req;

  return Users.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.status(200).json({ userID: id, userName: user.name});
  });
});

router.get('/', auth.required, async (req,res) => {

 
  const user = await Users.findById(req.query.userID)
  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })

})

router.put("/invite", auth.required, async (req, res, next) => {
  const {
    payload: { id }
  } = req;
  const projectID = req.query.projectID;
  const email = req.query.email;

  try {
    const proj = await project.findOne({ _id: projectID });
    const recepient = await Users.findOne({ email: email });

    let flag = true

    if(!recepient){
      res.status(400).json({
        message: 'user not registered'
      })
    }

    if (!proj) {
      res.status(400).json({ message: "Project not Found" });
    } else if (proj.owner != id) {
      res.status(401).json({ message: "Only owners can invite team members" });
    } else {
      proj.team.map(element => {

        if (element.userID.toString() == recepient._id.toString() && element.activated == true) {
          flag = false
          return res.status(400).json({ message: "Already in Team!" });
        } else if (element.userID.toString() == recepient._id.toString()) {
          return res.status(400).json({ message: "invite is already sent" });
        }
      });

      const arr = JSON.parse(JSON.stringify(proj.team));
      arr.push({ userID: recepient._id, activated: false });
      project.updateOne({ _id: projectID }, { team: arr }, err =>
        console.log(err)
      );

      //send email
      try {
        mailer.sendMail(
          recepient.email,
          "Agile Arena Invitation to " + proj.name, "Hi" +
            recepient.name +
            ", you have been invited to contribute to a project follow the link to accept. http//localhost:3000/api/user/accept?projectID=" +
            projectID + "&userID=" + recepient._id
        );
        res.status(200).json({
          message: "invite sent successfully",
          recepient
        });
      } catch (err) {
        res.json({
          message: "could not send mail"
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "error occured - invalid input",
      error: err
    });
  }
});

router.get("/accept", auth.optional, async (req, res) => {
  

  let flag = false;
  const projectID = req.query.projectID;
  const id = req.query.userID


  const proj = await project.findOne({ _id: projectID });
  console.log(proj)
  console.log(id)
  let arr = new Array();
  let counter = 0;

  console.log();
  proj.team.map(element => {
    if (element.userID.toString() == id.toString() && element.activated == true) {
      res.status(200).json({
        message: "you are already in team!"
      });
    } else if (element.userID.toString() == id.toString()) {
      flag = true;
      element.activated = true;
    }

    arr[counter] = JSON.parse(JSON.stringify(element));
    counter++;
  });

  if (flag) {
    project.updateOne({ _id: projectID }, { team: arr }, err =>
      console.log(err)
    );
    res.status(200).json({
      message: "invitation accepted successfully"
    });
  } else {
    res.status(401).json({
      message: "you were not invited! Sorry..."
    });
  }
});


router.put('/remove', auth.required, async (req,res) =>{

  const {
    payload: { id }
  } = req;

  const projectID = req.query.projectID
  console.log(projectID, '=======')
  const userID = req.query.userID
  const proj = await project.findOne({
    _id: projectID
  })
  if(proj){
    if(proj.owner == id && userID !== proj.owner){

    let arr = new Array()
    let counter = 0
    proj.team.map(element => {
      if(!(element.userID == userID)){
        arr.push(JSON.parse(JSON.stringify(element)))
      }
      counter++
    })
    project.updateOne({ _id: projectID }, { team: arr }, err => console.log(err));
    res.status(200).json({message: 'user removed successfully'})

  }
  else
    res.status(401).json({
      message: 'only owners can remove team members and they cannot remove themselves'
    })
  }
  else return res.status(404).json({
    message: 'could not find project'
  })
})

module.exports = router;
