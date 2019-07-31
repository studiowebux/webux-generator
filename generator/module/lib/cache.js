const fs = require("fs");
const path = require("path");

const createCache = answer => {
  const cache = {
    apiVersion: answer["apiVersion"],
    author: answer["author"],
    license: answer["license"],
    backendDir: answer["backendDir"]
  };

  fs.writeFile(
    path.join(__dirname, "moduleCache.txt"),
    JSON.stringify(cache),
    err => {
      if (err) {
        console.error(err);
      }
      console.log("Cache Saved !");
    }
  );
};

const readCache = () => {
  try {
    const cache = fs.readFileSync(path.join(__dirname, "moduleCache.txt"));
    console.log('read cache from : ' + path.join(__dirname, "moduleCache.txt"))
    return JSON.parse(cache);
  } catch (e) {
    if (e.code === "ENOENT") {
      return {};
    }
    console.error("An error occur while reading the cache. Using default values.");
  }
};

module.exports = {
  createCache,
  readCache
};
