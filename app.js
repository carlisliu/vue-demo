const express = require('express')();

//express.enable('strict routing');

var routes = require('./routes');
routes(express);

express.listen(3000);