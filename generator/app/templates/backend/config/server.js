module.exports = {
  ssl: {
    enabled: false,
    key: process.env.SSL_KEY || "", // base64 encode
    crt: process.env.SSL_CERT || "" // base64 encode
  },
  endpoint: "/api/v1",
  enterprise: "Your company",
  author: "You",
  project: "webuxjs-template",
  version: require("../package.json")["version"],
  port: process.env.PORT || 1337,
  cores: process.env.CORES || null,
  clusterize: process.env.CLUSTERIZE || false
};
