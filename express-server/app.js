// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Database connection
mongoose.connect(config.database);
mongoose.connection.on('connected', function(){
    console.log('Connected to database ' +config.database)
});

// Check for Database connection error
mongoose.connection.on('error', function(err){
    console.log('Database error: ' +err);
});

// Get API routes
const users = require ('./routes/users');

// Initializing the app
const app = express();

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// body-Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middldeware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/users', users);
app.get('/', function (req, res){
    res.send('api works');
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port,function () {
   console.log('Server starting on port ' +port);
});