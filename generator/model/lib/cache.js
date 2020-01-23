const fs = require("fs");
const path = require("path");

const createCache = answer => {
  const cache = {
    author: answer["author"],
    license: answer["license"],
    backendDir: answer["backendDir"]
  };

  fs.writeFile(
    path.join(__dirname, "modelCache.txt"),
    JSON.stringify(cache),
    err => {
      if (err) {
        console.error(err);
      }
      console.log(`\x1b[32mCache Saved !\x1b[0m`);
    }
  );
};

const readCache = () => {
  try {
    const cache = fs.readFileSync(path.join(__dirname, "modelCache.txt"));
    console.log("read cache from : " + path.join(__dirname, "modelCache.txt"));
    return JSON.parse(cache);
  } catch (e) {
    if (e.code === "ENOENT") {
      return {};
    }
    console.error(
      `\x1b[31mAn error occur while reading the cache. Using default values.\x1b[0m`
    );
  }
};

module.exports = {
  createCache,
  readCache
};
