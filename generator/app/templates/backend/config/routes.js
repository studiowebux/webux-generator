const Webux = require("webux-app");
const path = require("path");

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
