const app = require('express')();

//express.enable('strict routing');

var routes = require('./routes');
routes(app);

app.listen(3000);