const app = require('express')();

//express.enable('strict routing');

app.param('id', function(req, res, next, id, name) {
    console.log('parameter processer called', id, name);
    var url = req.originalUrl || req.url;
    if (url.indexOf('admin') > -1) {
        req.id = 'admin';
    } else {
        req.id = 'carlis'
    }
    next();
});

app.param('id', function(req, res, next, id, name) {
    console.log('another parameter processer called', id, name);
    next();
});

app.param('query', function(req, res, next, id, name) {
    console.log('query parameter processer called', id, name);
    next();
});

var routes = require('./routes');
routes(app);

app.listen(3000);