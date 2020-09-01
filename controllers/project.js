const Project = require("../models/project");
const User = require("../models/user");
const { errorHandler } = require('../helpers/dbError');
const mongoose = require('mongoose')

exports.create = (req, res) => {

    const newProject = new Project({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        dead_line: req.body.dead_line,
        todo: req.body.todo
    });

    newProject.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            justCreatedProject: {
                _id: result._id,
                title: result.title,
                description: result.description,
                dead_line: result.dead_line,
                todo: result.todo
            }
        }),
            console.log(result)

    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: errorHandler(err)
            });
    })
};

exports.readProject = (req, res) => {
    return res.json(req.project);
};

exports.projectsList = (req, res) => {
    Project.find()
        .exec((err, projects) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            if (projects.length === 0) {
                console.log("Il n\'y a aucun projet en cours")
                return res.json("Il n\'y a aucun projet en cours")
            }
            return res.json(projects);
        });
};

exports.updateProject = (req, res) => {
    const project = req.project;
    project.title = req.body.title;
    project.description = req.body.description;
    project.dead_line = req.body.dead_line;
    project.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
};
exports.updateTodoRepo = (req, res) => {
    Project.findOneAndUpdate(
        { _id: req.project._id },
        { $push: { todo: req.body._id } }
    )
        .then((project, err) => {
            if (err) {
                console.log(err)
            } else {
                res.json(project)
            }
        })
}
exports.deleteTodoFromRepo = (req, res) => {
    console.log(req.body)
    Project.findOneAndUpdate(
        { _id: req.project._id },
        { $pull: { todo: req.body._id } }
    )
        .then((project, err) => {
            if (err) {
                console.log(errorHandler(err))
            } else {
                return res.json(project)
            }
        })
}
exports.deleteProjectFromRepo = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { projectsId: req.body._id } }
    )
        .then((project, err) => {
            if (err) {
                console.log(errorHandler(err))
            } else {
                console.log(req)
                return res.json(project)
            }
        })
}
exports.projectById = (req, res, next, id) => {
    Project.findById(id).exec((err, project) => {
        if (err || !project) {
            return res.status(400).json({
                error: 'Ce projet n\'éxiste pas'
            });
        }
        req.project = project;
        next();
    });
};

exports.removeProject = (req, res) => {
    Project.findByIdAndDelete(
        { _id: req.project._id }
    ).then((response, err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        } else {
            res.json(response)
        }
        console.log("Ce projet à bien été supprimé")
    })
}