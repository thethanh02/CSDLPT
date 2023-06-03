const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://192.168.0.5:8080',
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};