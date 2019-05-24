// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

/**
 * File: functions.js
 * Author: Tommy Gingras
 * Date: 2018-24-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

const replace = require("replace-in-file");
const copy = require("fs-copy-file");
const fs = require("fs");
const path = require("path");

const FirstLetterCap = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

async function createFile(dest) {
  return new Promise(resolve => {
    fs.stat(dest, (err, stats) => {
      if (err && err.errno !== -2) {
        throw err;
      } else if (stats) {
        console.log(dest + " -> File already exist. SKIPPING");
        return resolve();
      }

      const template = dest.split("/");
      // the filepath content the template path.
      const filepath = path.join(
        __dirname,
        "templates",
        template[template.length - 2] + "_template.js" // to get the resource type e.g models_template.js from /.../models/something.js
      );
      // copy the template to the final destination.
      copy(filepath, dest, function(err) {
        if (err) {
          throw Error(
            "An error occur while copying " + filepath + " -> " + dest
          );
        }
        console.log(dest + " File copied with success !");
        return resolve();
      });
    });
  });
}

const updateInfo = options => {
  return new Promise(resolve => {
    // If all the files has been copied, we can replace the content of each.
    replace(options)
      .then(changes => {
        console.log("Modified files:", changes.join(", "));
        return resolve();
      })
      .catch(error => {
        console.error("Error occurred:", error);
        throw error;
      });
  });
};

const updateRoute = (backend_dir, resourceName) => {
  return new Promise(resolve => {
    fs.readFile(path.join(backend_dir, "config", "routes.json"), function(
      err,
      data
    ) {
      if (err) {
        throw err;
      }
      const json = JSON.parse(data);
      if (data.indexOf('"' + resourceName + '"') > -1) {
        console.error(
          "The resource is already present in the route file. SKIPPING"
        );
        return resolve();
      }
      json.push({
        module: resourceName,
        cache: false
      });

      fs.writeFile(
        path.join(backend_dir, "config", "routes.json"),
        JSON.stringify(json, null, 4),
        err => {
          if (err) {
            throw err;
          }

          console.log("Route Definition updated.");
          return resolve();
        }
      );
    });
  });
};

// For each required files, check if it already exist
// Or copy it and replace the variable with the good values.
async function processFiles(files) {
  for (const dest of files) {
    await createFile(dest);
  }
}
module.exports = {
  processFiles,
  updateInfo,
  updateRoute,
  FirstLetterCap
};
