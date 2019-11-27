const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Projects = mongoose.model('Projects');
const Sprints = mongoose.model('Sprints')



router.post('/', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const sprint = req.body.sprint;
    let exProject = await Projects.findById(req.query.projectID);
    if (!exProject) {
        return res.status(422).json({
            errors: {
                Project: 'Invalid Project ID',
            },
        });
    }
    if (exProject.owner != id) {
        return res.status(422).json({
            errors: {
                Owner: 'Unathorized',
            },
        });
    }
    let body = {
        "startDate": sprint.startDate,
        "endDate": sprint.endDate,
        "projectID": req.query.projectID,
        "name": sprint.name,
        "active": sprint.active
    }
    let finalSprint = await Sprints.create(body)
    if (finalSprint) {
        return res.status(200).json({

            Sprint: 'Created Successfully'
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

router.delete('/', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    let exSprint = await Sprints.findById(req.query.sprintID);
    if (!exSprint) {
        return res.status(422).json({
            errors: {
                Project: 'Invalid Sprint ID',
            },
        });
    }
    let exProject = await Projects.findById(exSprint.projectID);
    if (exProject.owner != id) {
        return res.status(422).json({
            errors: {
                Owner: 'Unathorized',
            },
        });
    }
    let finalSprint = await Sprints.findByIdAndRemove(req.query.sprintID)
    if (finalSprint) {
        return res.status(200).json({

            Sprint: 'Deleted Successfully'
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