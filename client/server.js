const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const serveIndex = require('serve-index');
 
app.use(compression());
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));
app.use('/public', express.static('public'))
 
app.get('*', function(req, res) {
    res.sendFile(__dirname, 'build', 'index.html');
});
 

 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});