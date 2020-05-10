// This is to proxy to the netlify lambda function.
// It will only work *after* you deploy your lambda function and it's
// running successfully on netlify, and you have started the
// netlify-lambda server separately: `yarn lambda`. It should be
// serving on port 9000.

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/.netlify/functions/", {
      target: "http://localhost:9000/",
      pathRewrite: {
        "^/\\.netlify/functions": "",
      },
    })
  );
};
