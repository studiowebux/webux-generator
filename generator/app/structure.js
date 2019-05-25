// ███████╗████████╗██████╗ ██╗   ██╗ ██████╗████████╗██╗   ██╗██████╗ ███████╗
// ██╔════╝╚══██╔══╝██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝
// ███████╗   ██║   ██████╔╝██║   ██║██║        ██║   ██║   ██║██████╔╝█████╗
// ╚════██║   ██║   ██╔══██╗██║   ██║██║        ██║   ██║   ██║██╔══██╗██╔══╝
// ███████║   ██║   ██║  ██║╚██████╔╝╚██████╗   ██║   ╚██████╔╝██║  ██║███████╗
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝

/**
 * File: structure.js
 * Author: Tommy Gingras
 * Date: 2018-24-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

const backend = {
  ".tmp": {
    "README.md": ""
  },
  actions: {
    "README.md": ""
  },
  bin: {
    www: ""
  },
  config: {
    "production.js": "",
    "development.js": "",
    "config.js": "",
    "db_models_overwrite.json": "",
    "db.js": "",
    "README.md": "",
    "routes.json": ""
  },
  constants: {
    "README.md": ""
  },
  defaults: {
    "README.md": ""
  },
  helpers: {
    "README.md": ""
  },
  locales: {
    "README.md": ""
  },
  middleware: {
    "README.md": "",
    auth: {
      "isAuthenticated.js": "",
      "isAuthorized.js":""
    },
    init: {
      "defaultValues.js": "",
      "errorHandling.js": "",
      "index.js": "",
      "language.js": "",
      "limiter.js": ""
    },
    mail: {
      "sendmail.js": ""
    },
    routes: {
      "cache.js": "",
      "isDisabled.js": "",
      "query.js": ""
    },
    thirdParty: {
      transport: {
        "logstash.js": ""
      },
      "logger.js": "",
      "redis.js": "",
      "validator.js": ""
    },
    tools: {
      "cron.js": "",
      "error.js": "",
      "headers.js": "",
      "IP.js": "",
      "quote.js": "",
      "trim.js": ""
    }
  },
  models: {
    "README.md": ""
  },
  routes: {
    "index.js": ""
  },
  sockets: {
    "README.md": "",
    "config.js": "",
    "index.js": ""
  },
  ssl: {
    "README.md": ""
  },
  test: {
    "test.js": "",
    cases: {
      "README.md": ""
    }
  },
  uploads: {
    "README.md": ""
  },
  validations: {
    "README.md": ""
  },
  ".dockerignore": "",
  ".eslintrc.json": "",
  "app.js": "",
  Dockerfile: "",
  "Gruntfile.js": "",
  "README.md": "",
  "package.json": ""
};

const frontend = {
  client: {
    "README.md": ""
  },
  nginx: {
    certs: {
      "README.md": ""
    },
    "nginx.conf": ""
  },
  ".dockerignore": "",
  Dockerfile: "",
  "README.md": ""
};

module.exports = {
  backend,
  frontend
};
