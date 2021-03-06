const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Projects = mongoose.model('Projects');
const Tasks = mongoose.model('Tasks')
const mailer = require('../mail')
const Users = mongoose.model('Users')


router.get('/GetTasksOfSprint', auth.required, async (req, res, next) => {
    const sprintID = req.query.sprintID;
    let Utasks = await Tasks.find({sprintID:sprintID})
    if(Utasks)
        return res.status(200).json({Tasks:Utasks})
    else
        return res.status(422).json({Error:'Can not find task'})
})  
router.delete('/', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const taskID = req.query.taskID;
    let task = await Tasks.findById(taskID)
    console.log('dah id '+taskID)
    console.log('dah task '+task)

    let exProject = await Projects.findById(task.projectID);
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
    let deleted =  await Tasks.findByIdAndDelete(taskID)
    if(deleted)
    {
        return res.status(200).json({
                Task: 'Deleted successfully',
        });
    }
    else
    {
        return res.status(422).json({
            errors: {
                Task: 'Can not delete',
            },
        });
    }

})

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
    let UserID = await exProject.team.find(o => o.userID == id && o.activated == true);
    if (!UserID && exProject.owner !== id) {
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
    if(task.asignee)
    {
        let text = "You have been assigned to new Task "+task.name+" in the project "+exProject.name
        mailer.sendMail(task.asignee,"Notification from Agile Arena",text)
    }
    let finalTask = await Tasks.create(body)
    if (finalTask) {
        return res.status(200).json({

            Task: 'Created Successfully'
        },
        );
    }
    else {
        return res.status(424).json({
            errors:
                'Something went wrong , try again later'

        });
    }


})

router.put('/Assign', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    let asignee = req.query.asigneeID;
    const task = await Tasks.findById(req.query.taskID)
    if(!task)
    {
        return res.status(422).json({
            errors: {
                Task: 'Invalid task ID',
            },
        });
    }
    let projectID = task.projectID;
    let exProject =await Projects.findById(projectID);
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
        let text = "You have been assigned to new Task "+task.name+" in the project "+exProject.name
        mailer.sendMail(AsigneeI.email,"Notification from Agile Arena",text)
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


router.put('/', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;

    const task = await Tasks.findById(req.query.taskID)
    if(!task)
    {
        return res.status(422).json({
            errors: {
                Task: 'Invalid task ID',
            },
        });
    }
    let projectID = task.projectID;
    let exProject = await Projects.findById(projectID);
    let UserI = await exProject.team.find(o => o.userID === id && o.activated === true);
    if (!UserI && exProject.owner != id) {
        return res.status(422).json({
            errors: {
                User: 'Unathorized',
            },
        });
    }
    let finalTask = await Tasks.findByIdAndUpdate(req.query.taskID,req.body.task)
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