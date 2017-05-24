const Vue = require('vue');
const express = require('express')();
const render = require('vue-server-renderer').createRenderer();

express.get('*', (req, res) => {
    const vm = new Vue({
        template: '<div>The visited URL is: {{ url }}</div>',
        data: {
            url: req.url
        }
    });

    render.renderToString(vm, (err, html) => {
        if (err) {
            return res.status(500).end('Internal Server Error');
        }
        res.end(`
          <!DOCTYPE html>
          <html lang="en">
            <head><title>Hello</title></head>
            <body>${html}</body>
          </html>
        `);
    });
});

express.listen(3000);