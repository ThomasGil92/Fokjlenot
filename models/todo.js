const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
        unique: false
    },
    description: {
        type: String,
        trim: true,
        maxlength: 2000,
        required: false
    },

    category: {
        type: String,
        default: "5f1989f72dc01108b89f3605"
    },
    bgColor: {
        type: String,
        default: "#FFFFFF"
    },
    subtaskList: {
        type:Array
    },
    dead_line: {
        type: Date,
        required: false
    }/* ,
    task_begin:{
        type:Date,
        required:false
    } */
},
    {
        timestamps: true,
        collection: "todos"
    }
);


module.exports = mongoose.model("Todo", todoSchema);