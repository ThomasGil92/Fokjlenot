const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
        maxlength: 2000
    },

    todo:{
        type:Array
    },
    dead_line: {
        type: Date,
        required: false
    }
},
    {
        timestamps: true,
        collection: "projects"
    }
);


module.exports = mongoose.model("Project", projectSchema);