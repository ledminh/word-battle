var express = require('express');
var app = express();
var passport = require('passport');
var io;

//MONGOOSE
var data = require('./server/mongoose');

//CONFIGURE
require('./server/configure')(express, app, passport, data);

//ADD ROUTES
require('./server/routes')(express, app, passport, data);

var server = app.listen(8080);

require('./server/socket')(server, io, data);


console.log("App is listenning on PORT", 8080);
