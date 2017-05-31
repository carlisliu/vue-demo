const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const render = require('vue-server-renderer').createRenderer();

module.exports = function(app) {
    app.route('/').get(function(req, res, next) {
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
                <head><title>Hello:${vm.$url || ''}</title></head>
                <body>${html}</body>
              </html>
            `);
        });
    });

    app.route('/template').get(function(req, res, next) {
        const vm = new Vue({
            template: fs.readFileSync(path.resolve(__dirname, '../templates/index.template.html'), 'utf-8'),
            data: {
                message: 'ssr1'
            }
        });

        render.renderToString(vm, {
            message: 'ssr'
        }, (err, html) => {
            if (err) {
                return res.status(500).end('Internal Server Error');
            }
            res.end(html);
        });
    });
};