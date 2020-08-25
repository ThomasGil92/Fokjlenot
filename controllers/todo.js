const Todo = require("../models/todo");
const { errorHandler } = require('../helpers/dbError');
const mongoose = require('mongoose')

exports.todoById = (req, res, next, id) => {
    Todo.findById(id).exec((err, todo) => {
        if (err || !todo) {
            return res.status(400).json({
                error: 'Cette tache n\éxiste pas'
            });
        }
        req.todo = todo;
        next();
    });
};

exports.todosList = (req, res) => {
    Todo.find()
        .exec((err, todos) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            if (todos.length === 0) {
                console.log("Il n\'y a aucune tache")
                res.json("Il n'y a aucune tache")
            }
            res.json(todos);
        });
};

exports.createTodo = (req, res) => {

    const newTodo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        dead_line: req.body.dead_line,
        begin_task: req.body.begin_task,
        category: req.body.category
    });

    newTodo.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            justCreatedTodo: {
                _id: result._id,
                title: result.title,
                description: result.description,
                dead_line: result.dead_line,
                begin_task: result.begin_task,
                category: result.category,
                subTask: result.subTask
            }
        }),
            console.log(result)

    }).catch(err => {
        console.log(req)
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
};

exports.updateTodo = (req, res) => {
    console.log(req.profile)
    Todo.findOneAndUpdate(
        { _id: req.todo._id },
        { $set: { category: req.body.category } }
    )
        .then((todo, err) => {
            if (err) {
                console.log(err)
            } else {
                res.json(todo)
            }
        })
};
exports.updateBgColor = (req, res) => {
    console.log(req.profile)
    Todo.findOneAndUpdate(
        { _id: req.todo._id },
        { $set: { bgColor: req.body.bgColor } }
    )
        .then((todo, err) => {
            if (err) {
                console.log(err)
            } else {
                res.json(todo)
            }
        })
};
exports.readTodo = (req, res) => {
    return res.json(req.todo);
}
exports.removeTodo = (req, res) => {
    Todo.findByIdAndDelete(
        { _id: req.todo._id }
    ).then((response, err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        } else {
            res.json(response)
        }
        console.log("Cette tâche a bien été supprimée")
    })
}
exports.addTodoSubtaskList = (req, res) => {
    Todo.findOneAndUpdate(
        { _id: req.todo._id },
        { $push: { subtaskList: req.body.subId } }
    ).then((response, err) => {
        if (err) {
            console.log(err)
        } else {
            res.json(response)
        }
    })
}
exports.removeSubtaskId=(req,res)=>{
    Todo.findOneAndUpdate(
        { _id: req.todo._id },
        { $pull: { subtaskList: req.body.subId } }
    )
        .then((todo, err) => {
            if (err) {
                console.log(errorHandler(err))
            } else {
                return res.json(todo)
            }
        })
}