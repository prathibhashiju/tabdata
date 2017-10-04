﻿require('rootpath')();
var express = require('express');
var ejs = require('ejs');
var app = express();
var compression = require('compression');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var config = require('config.json');

// enable ejs templates to have .html extension
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// set default views folder
app.set('views', __dirname + '/../client');

// enable gzip compression
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: config.secret,
    store: new MongoStore({ url: config.connectionString }),
    resave: false,
    saveUninitialized: true
}));



// api routes

app.use('/api/books', require('./controllers/api/books.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));


// make JWT token available to angular app
app.get('/token', function (req, res) { 
    res.send(req.session.token);
});

// standalone pages
app.use('/register', require('./controllers/register.controller'));
app.use('/login', require('./controllers/login.controller'));
// admin section
app.use('/admin', require('./controllers/admin.controller'));


app.use('/', require('./controllers/login.controller'));


// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 3000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
