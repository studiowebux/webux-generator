// ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
// ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝

/**
 * File: generate.js
 * Author: Tommy Gingras
 * Date: 2018-12-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

const inquirer = require("inquirer");
const fs = require("fs");
const pluralize = require("pluralize");
const replace = require("replace-in-file");
const copy = require("fs-copy-file");

const todayDate = new Date().toISOString().slice(0, 10);
const questions = [
  {
    name: "api",
    type: "input",
    message: "resource name:",
    validate: function(input) {
      if (/^([A-Za-z])+$/.test(input)) return true;
      else return "Resource may only include letters";
    }
  },
  {
    name: "author",
    type: "input",
    message: "Author name:"
  },
  {
    name: "license",
    type: "input",
    message: "License:"
  }
];

const FirstLetterCap = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Ask the question to create the files.
inquirer.prompt(questions).then(answers => {
  let resourceName = answers["api"];
  let authorName = answers["author"];
  let license = answers["license"];

  // Files to be created for a new resource.
  const files = [
      "../backend/actions/" + resourceName + ".js",
      "../backend/routes/" + resourceName + ".js",
      "../backend/models/" + resourceName + ".js",
      "../backend/test/cases/" + resourceName + ".js",
      "../backend/validations/" + resourceName + ".js",
      "../backend/helpers/" + resourceName + ".js",
      "../backend/constants/" + resourceName + ".js"
    ],
    options = {
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
        todayDate,
        license,
        resourceName.toUpperCase(),
        FirstLetterCap(resourceName),
        pluralize.plural(resourceName),
        resourceName,
        resourceName
      ]
    };

  // For each required files, check if it already exist
  // Or copy it and replace the variable with the good values.
  files.forEach(dest => {
    fs.stat(dest, (err, stats) => {
      if (err) {
        throw err;
      } else if (stats) {
        console.log(dest + " -> File already exist. SKIPPING");
        return;
      }

      const template = dest.split("/");
      // the filepath content the template path.
      const filepath =
        "./templates/" +
        (template[1] != "models" ? template[1] : template[2]) +
        "_template.js";
      // copy the template to the final destination.
      copy(filepath, dest, function(err) {
        if (err) {
          throw Error(
            "An error occur while copying" + filepath + " -> " + dest
          );
        }
        console.log(dest + " File copied with success !");
        return;
      });
    });
  });

  // If all the files has been copied, we can replace the content of each.
  replace(options)
    .then(changes => {
      console.log("Modified files:", changes.join(", "));
    })
    .catch(error => {
      console.error("Error occurred:", error);
    });

  fs.readFile("../backend/config/routes.json", function(err, data) {
    if (err) {
      throw err;
    }
    const json = JSON.parse(data);
    json.push({
      module: resourceName,
      cache: false
    });

    fs.writeFile(
      "../backend/config/routes.json",
      JSON.stringify(json, null, 4),
      err => {
        if (err) {
          throw err;
        }

        console.log("Route Definition updated.");
        return;
      }
    );
  });
});
