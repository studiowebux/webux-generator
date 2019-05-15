const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

const { frontend, backend } = require("./structure");

const templatePath = path.join("templates");
const projectDirectory = "new-project";

let files = [];
let errors = 0;

const hasChildren = (base, parent, child, file) => {
  let filename = file ? path.join(file) : path.join(base);
  if (
    typeof parent[child] === "object" &&
    Object.keys(parent[child]).length > 0
  ) {
    filename = path.join(filename, child);

    Object.keys(parent[child]).forEach(element => {
      hasChildren(base, parent[child], element, filename);
    });
  } else {
    filename = parent[child]
      ? path.join(filename, parent[child])
      : path.join(filename, child);
    files.push(filename);
  }

  return;
};

Object.keys(frontend).forEach(element => {
  hasChildren(path.join(templatePath, "frontend"), frontend, element);
});

Object.keys(backend).forEach(element => {
  hasChildren(path.join(templatePath, "backend"), backend, element);
});

fs.mkdir(path.join(projectDirectory), err => {
  if (err && err.errno !== -17) {
    throw err;
  }

  files.forEach(file => {
    const sanitizeFile = file.replace(/\.\.\//g, ""); // remove pattern '../'
    fs.stat(path.join(projectDirectory, sanitizeFile), (err, exist) => {
      if (err && err.errno !== -2) {
        throw err;
      } else if (exist) {
        errors++;
        console.log(path.join(projectDirectory, sanitizeFile) + " File exist");
        return;
      }
      const newDir = path.join(projectDirectory, sanitizeFile);
      const dir = newDir.substr(0, newDir.lastIndexOf("/"));
      fse.ensureDir(dir, err => {
        if (err) {
          throw err;
        }
        fse.copy(
          path.join(file),
          path.join(projectDirectory, sanitizeFile),
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
  });
});
