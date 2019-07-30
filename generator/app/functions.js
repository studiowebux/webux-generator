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

"use strict";

const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

let slash = "/";
if (process.platform === "win32") {
  slash = "\\";
}

const hasChildren = (files, base, parent, child, file) => {
  let filename = file ? path.join(file) : path.join(base);
  if (
    typeof parent[child] === "object" &&
    Object.keys(parent[child]).length > 0
  ) {
    filename = path.join(filename, child);

    Object.keys(parent[child]).forEach(element => {
      hasChildren(files, base, parent[child], element, filename);
    });
  } else {
    if (parent[child] && typeof parent[child] === "string") {
      filename = path.join(filename, parent[child]);
    } else {
      filename = path.join(filename, child);
    }
    files.push(filename);
  }

  return;
};

const createFile = (file, templatePath, projectDirectory) => {
  let sanitizeFile = file.replace(/\.\.\//g, ""); // remove pattern '../'
  if (process.platform === "win32") {
    sanitizeFile = file.replace(/\.\.\\/g, ""); // remove pattern '..\'
  }
  sanitizeFile = sanitizeFile.replace(templatePath, ""); // remove the template path

  fs.stat(path.join(projectDirectory, sanitizeFile), (err, exist) => {
    if (err && err.code !== "ENOENT") {
      throw err;
    } else if (exist) {
      console.log(path.join(projectDirectory, sanitizeFile) + " File exist");
      return;
    }

    const newDir = path.join(projectDirectory, sanitizeFile);
    const dir = newDir.substr(0, newDir.lastIndexOf(slash));

    fse.ensureDir(dir, err => {
      // if dir not exists, create it.
      if (err) {
        throw err;
      }

      fse.copy(
        path.join(file), // from
        path.join(projectDirectory, sanitizeFile), //to
        err => {
          if (err) {
            throw err;
          }

          console.log(file + " Copied !");
          return;
        }
      );
    });
  });
};

module.exports = {
  hasChildren,
  createFile
};
