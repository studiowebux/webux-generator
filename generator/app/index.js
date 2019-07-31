// ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
// ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2018-22-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { prompt } = require("inquirer");
const { hasChildren, createFile } = require("./functions");
const { frontend, backend } = require("./structure");
const { questions } = require("./questions");

try {
  prompt(questions).then(answers => {
    let projectDirectory = answers["projectDirectory"];
    let templatePath = answers["templatePath"];
    let files = [];

    if (!path.isAbsolute(projectDirectory)) {
      throw new Error("The project directory must be an absolute path.");
    }

    if (!path.isAbsolute(templatePath)) {
      throw new Error("The template directory must be an absolute path.");
    }

    // Create frontend architecture
    Object.keys(frontend).forEach(element => {
      hasChildren(
        files,
        path.join(templatePath, "frontend"),
        frontend,
        element
      );
    });

    // Create backend architecture
    Object.keys(backend).forEach(element => {
      hasChildren(files, path.join(templatePath, "backend"), backend, element);
    });

    fs.mkdir(path.join(projectDirectory), err => {
      if (err && err.errno !== -17) {
        throw err;
      }

      files.forEach(file => {
        createFile(file, templatePath, projectDirectory);
      });
    });
  });
} catch (e) {
  console.error(e);
}
