const Subtask = require("../models/subtask");
const Todo = require("../models/todo");
const { errorHandler } = require('../helpers/dbError');
const mongoose = require('mongoose')

exports.createSubtask = (req, res) => {

    const newSubtask = new Subtask({
        
        _id: new mongoose.Types.ObjectId(),
        content: req.body.content
    });

    newSubtask.save().then(result => {
        res.status(201).json({
            message: "Done upload!"
        }),
            console.log(result)
        res.json(result)
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
};
exports.removeSubtask=(req,res)=>{
    Subtask.findOneAndDelete(
        { _id: req.body.subId }
    )
        .then((response, err) => {
            if (err) {
                console.log(err)
            } else {
                res.json(response)
            }
            console.log("Sous-tâche correctement supprimée")
        }) 
    
}
exports.subtaskById = (req, res, next, id) => {
    Subtask.findById(id).exec((err, subtask) => {
        if (err || !subtask) {
            return res.status(400).json({
                error: 'Cette sous-tâche n\éxiste pas'
            });
        }
        req.subtask = subtask;
        next();
    });
};
exports.readSubtask = (req, res) => {
    return res.json(req.subtask);
}