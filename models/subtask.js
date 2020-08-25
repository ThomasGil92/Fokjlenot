const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
        unique: false
    },
    done:{
        type:Boolean
    }
},
    {
        timestamps: true,
        collection: "subtasks"
    }
);


module.exports = mongoose.model("Subtask", subtaskSchema);