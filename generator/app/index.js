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
const { hasChildren, processFiles } = require("./functions");
const { frontend, backend } = require("./structure");
const { questions } = require("./questions");
const { updateInfo } = require("../lib/utils");

try {
  prompt(questions).then(answers => {
    if (answers["validation"].toLowerCase() !== "y") {
      return;
    }
    let projectDirectory = answers["projectDirectory"];
    let projectName = answers["projectName"];
    let projectAuthor = answers["projectAuthor"];
    let projectDescription = answers["projectDescription"];
    let templatePath = answers["templatePath"];
    let files = [];

    if (!path.isAbsolute(projectDirectory)) {
      throw new Error("The project directory must be an absolute path.");
    }

    if (!path.isAbsolute(templatePath)) {
      throw new Error("The template directory must be an absolute path.");
    }

    const options = {
      files: [
        path.join(projectDirectory, projectName, "backend", "package.json")
      ],
      from: [/{{author}}/g, /{{description}}/g, /{{name}}/g],
      to: [projectAuthor, projectDescription, projectName]
    };

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

    fs.mkdir(path.join(projectDirectory, projectName), err => {
      if (err && err.errno !== -17) {
        throw err;
      }

      Promise.all([
        processFiles(
          files,
          templatePath,
          path.join(projectDirectory, projectName)
        )
      ])
        .then(() => {
          console.log("Webux Generator - update info");
          updateInfo(options)
            .then(() => {
              console.log("-----------");
              console.log("Getting Started: ");
              console.log("cd " + projectName + "/backend");
              console.log("npm install");
              console.log("-----------");
              console.log(
                "More details : http://www.webuxlab.com/docs/webux_demo/getting_started/"
              );
            })
            .catch(e => {
              throw e;
            });
        })
        .catch(error => {
          console.error("\x1b[31m", error, "\x1b[0m");
        });
    });
  });
} catch (e) {
  console.error("\x1b[31m", e, "\x1b[0m");
}
