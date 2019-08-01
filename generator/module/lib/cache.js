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
      console.log("\x1b[32m", "Cache Saved !", "\x1b[0m");
    }
  );
};

const readCache = () => {
  try {
    const cache = fs.readFileSync(path.join(__dirname, "moduleCache.txt"));
    console.log("read cache from : " + path.join(__dirname, "moduleCache.txt"));
    return JSON.parse(cache);
  } catch (e) {
    if (e.code === "ENOENT") {
      return {};
    }
    console.error(
      "\x1b[31m",
      "An error occur while reading the cache. Using default values.",
      "\x1b[0m"
    );
  }
};

module.exports = {
  createCache,
  readCache
};
