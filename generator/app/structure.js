// ███████╗████████╗██████╗ ██╗   ██╗ ██████╗████████╗██╗   ██╗██████╗ ███████╗
// ██╔════╝╚══██╔══╝██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝
// ███████╗   ██║   ██████╔╝██║   ██║██║        ██║   ██║   ██║██████╔╝█████╗
// ╚════██║   ██║   ██╔══██╗██║   ██║██║        ██║   ██║   ██║██╔══██╗██╔══╝
// ███████║   ██║   ██║  ██║╚██████╔╝╚██████╗   ██║   ╚██████╔╝██║  ██║███████╗
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝

/**
 * File: structure.js
 * Author: Tommy Gingras
 * Date: 2018-05-24
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const backend = {
  ".tmp": {},
  api: {
    v1: {
      actions: {},
      constants: {},
      helpers: {},
      middlewares: {},
      validations: {}
    }
  },
  app: {
    "index.js": ""
  },
  config: {
    "db.js": "",
    "language.js": "",
    "limiter.js": "",
    "logger.js": "",
    "mailer.js": "",
    "request.js": "",
    "routes.js": "",
    "security.js": "",
    "seed.js": "",
    "server.js": "",
    "socket.js": "",
    "upload.js": ""
  },
  defaults: {},
  locales: {},
  models: {},
  SSL: {},
  tests: {
    "test.js": "",
    cases: {}
  },
  uploads: {},
  ".dockerignore": "",
  ".gitignore": "",
  ".eslintrc.json": "",
  "index.js": "",
  Dockerfile: "",
  "docker-compose.yml": "",
  "package.json": "",
  "license.txt": "",
  "README.md": ""
};

const frontend = {
  client: {
    "README.md": ""
  },
  nginx: {
    certs: {},
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
