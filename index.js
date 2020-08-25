const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const todoRoutes = require('./routes/todo');
const subtaskRoutes = require('./routes/subtask');
const emailRoutes = require('./routes/email');
const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('DB Connected'));
app.use(expressValidator());
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json(/* { type: 'application/*+json' } */));



app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", todoRoutes);
app.use("/api", emailRoutes);
app.use("/api", subtaskRoutes);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/public', express.static('public'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html')); // relative path
});

const PORT = process.env.PORT || 8000
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}.`);
});