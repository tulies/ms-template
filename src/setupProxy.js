const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "http://localhost:9191/",
      // target: "http://47.98.202.148:9191/",
      changeOrigin: true,
      pathRewrite: {
        // "^/api/old-path": "/api/new-path", // rewrite path
        "^/api/": "/", // remove base path
      },
    })
  );
};
// http://localhost:3000/rest/foo/bar -> http://localhost/rest/foo/bar
