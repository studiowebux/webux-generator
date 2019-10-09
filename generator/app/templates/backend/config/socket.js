const path = require("path");

// by default, this file is empty you should check the documentation

module.exports = {
  baseDir: path.join(__dirname, "..", "api", "v1", "actions"),
  isAuthenticated: null,
  // require(path.join(
  //   "..",
  //   "api",
  //   "v1",
  //   "plugins",
  //   "auth",
  //   "isAuth.js"
  // )),
  accessTokenKey: "accessToken",
  redis: {
    enabled: false,
    mock:
      process.env.REDIS_MOCK && process.env.REDIS_MOCK == "false"
        ? false
        : false,
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || "6379",
    password: process.env.REDIS_PASSWORD || "password"
  }
};
