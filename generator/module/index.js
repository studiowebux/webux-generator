// ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
// ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2018-12-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

const { prompt } = require("inquirer");
const { plural } = require("pluralize");
const path = require("path");
const {
  processFiles,
  updateInfo,
  updateRoute,
  FirstLetterCap
} = require("./functions");
const { questions } = require("./questions");
const today = new Date().toISOString().slice(0, 10);

// Ask the question to create the files.
prompt(questions).then(answers => {
  const resourceName = answers["api"];
  const authorName = answers["author"];
  const license = answers["license"];
  const backend_dir = answers["backend_dir"];

  // Files to be created for a new resource.

  const files = [
    path.join(backend_dir, "actions", resourceName + ".js"),
    path.join(backend_dir, "routes", resourceName + ".js"),
    path.join(backend_dir, "models", resourceName + ".js"),
    path.join(backend_dir, "test", "cases", resourceName + ".js"),
    path.join(backend_dir, "validations", resourceName + ".js"),
    path.join(backend_dir, "helpers", resourceName + ".js"),
    path.join(backend_dir, "constants", resourceName + ".js"),
    path.join(backend_dir, "defaults", resourceName + ".js")
  ];
  const options = {
    files: files,
    from: [
      /{{filename}}/g,
      /{{author}}/g,
      /{{date}}/g,
      /{{license}}/g,
      /{{filename_caps}}/g,
      /{{model}}/g,
      /{{actions}}/g,
      /{{action}}/g,
      /{{schema}}/g
    ],
    to: [
      resourceName,
      authorName,
      today,
      license,
      resourceName.toUpperCase(),
      FirstLetterCap(resourceName),
      plural(resourceName),
      resourceName,
      resourceName
    ]
  };

  Promise.all([processFiles(files)])
    .then(() =>
      updateInfo(options).then(() => {
        updateRoute(backend_dir, resourceName);
      })
    )
    .finally(() => {
      console.log("Completed !");
    })
    .catch(error => {
      console.error(error);
    });
});
