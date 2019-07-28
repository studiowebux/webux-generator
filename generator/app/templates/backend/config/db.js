const path = require("path");

module.exports = {
  sort: [],
  local: true,
  debug: true,
  URL: process.env.DB_URL || "@127.0.0.1:27017/framework",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  modelDir: path.join(__dirname, "..", "models"),
  advanced: {
    keepAlive: 300000,
    socketTimeoutMS: 30000,
    replicaSet: "",
    autoIndex: false,
    useNewUrlParser: true,
    reconnectTries: 30
  }
};
