const Webux = require("webux-app"); // to access the Webux.query() function

module.exports = {
  "/": {
    resources: {
      "/healthcheck": [
        {
          method: "get",
          middlewares: [], // By default, this route is publicly available, you should create a middleware to protect this resource.
          action: (req, res, next) => {
            return res.success({ msg: "Pong !" });
          }
        }
      ]
    }
  }
};
