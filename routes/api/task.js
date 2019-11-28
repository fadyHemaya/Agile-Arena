const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Projects = mongoose.model('Projects');
const Tasks = mongoose.model('Tasks')
const Users = mongoose.model('Users')



router.post('/', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const task = req.body.task;
    let exProject = await Projects.findById(req.query.projectID);
    if (!exProject) {
        return res.status(422).json({
            errors: {
                Project: 'Invalid Project ID',
            },
        });
    }
    let UserID = await exProject.team.find(o => o.userID === id && o.activated === true);

    if (!UserID && exProject.owner != id) {
        return res.status(422).json({
            errors: {
                User: 'Unathorized',
            },
        });
    }
    let body = {
        "type": task.type,
        "name": task.name,
        "points": task.points,
        "priority": task.priority,
        "description": task.description,
        "creator": id,
        "asignee": task.asignee,
        "status": task.status,
        "dateCreated": Date.now(),
        "dateFinished": task.dateFinished,
        "projectID": req.query.projectID,
        "sprintID": task.sprintID
    }
    let finalTask = await Tasks.create(body)
    if (finalTask) {
        return res.status(200).json({

            Task: 'Created Successfully'
        },
        );
    }
    else {
        return res.status(422).json({
            errors:
                'Something went wrong , try again later'

        });
    }


})

router.put('/Assign', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    let asignee = req.query.asigneeID;
    let projectID = await Tasks.findById(req.query.taskID).projectID;
    let exProject = Projects.findById(projectID);
    let UserI = await exProject.team.find(o => o.userID === id && o.activated === true);
    let AsigneeI = await exProject.team.find(o => o.userID === asignee && o.activated === true);
    if (!UserI && exProject.owner != id) {
        return res.status(422).json({
            errors: {
                User: 'Unathorized',
            },
        });
    }
    if (!AsigneeI) {
        return res.status(422).json({
            errors: {
                Asignee: 'Invalid team member',
            },
        });
    }
    let finalTask = await Tasks.findByIdAndUpdate(req.query.taskID,{"asignee":asignee})
    if (finalTask) {
        return res.status(200).json({

            Task: 'Updated Successfully'
        },
        );
    }
    else {
        return res.status(422).json({
            errors:
                'Something went wrong , try again later'

        });
    }


})



module.exports = router;