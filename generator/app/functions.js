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

const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

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
    filename = parent[child]
      ? path.join(filename, parent[child])
      : path.join(filename, child);
    files.push(filename);
  }

  return;
};

const createFile = (file, templatePath, projectDirectory) => {
  let sanitizeFile = file.replace(/\.\.\//g, ""); // remove pattern '../'
  sanitizeFile = sanitizeFile.replace(templatePath, ""); // remove the template path

  fs.stat(path.join(projectDirectory, sanitizeFile), (err, exist) => {
    if (err && err.errno !== -2) {
      throw err;
    } else if (exist) {
      console.log(path.join(projectDirectory, sanitizeFile) + " File exist");
      return;
    }

    const newDir = path.join(projectDirectory, sanitizeFile);
    const dir = newDir.substr(0, newDir.lastIndexOf("/"));

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
