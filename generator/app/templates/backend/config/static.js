const path = require("path");
module.exports = {
  resources: [{ path: "/", resource: path.join(__dirname, "..", "apidoc") }]
};
