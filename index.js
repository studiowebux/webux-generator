#!/usr/bin/env node

//
// ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
// ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2018-05-24
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const path = require("path");

console.log(
  "██╗    ██╗███████╗██████╗ ██╗   ██╗██╗  ██╗    ██╗      █████╗ ██████╗ "
);
console.log(
  "██║    ██║██╔════╝██╔══██╗██║   ██║╚██╗██╔╝    ██║     ██╔══██╗██╔══██╗"
);
console.log(
  "██║ █╗ ██║█████╗  ██████╔╝██║   ██║ ╚███╔╝     ██║     ███████║██████╔╝"
);
console.log(
  "██║███╗██║██╔══╝  ██╔══██╗██║   ██║ ██╔██╗     ██║     ██╔══██║██╔══██╗"
);
console.log(
  "╚███╔███╔╝███████╗██████╔╝╚██████╔╝██╔╝ ██╗    ███████╗██║  ██║██████╔╝"
);
console.log(
  " ╚══╝╚══╝ ╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═════╝ "
);

console.log(
  "---------------------------------------------------------------------------------"
);
console.log("█████╗ ██████╗ ██╗");
console.log("██╔══██╗██╔══██╗██║");
console.log("███████║██████╔╝██║");
console.log("██╔══██║██╔═══╝ ██║");
console.log("██║  ██║██║     ██║");
console.log("╚═╝  ╚═╝╚═╝     ╚═╝");
console.log(
  "██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗ "
);
console.log(
  "██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗"
);
console.log(
  "██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝"
);
console.log(
  "██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗"
);
console.log(
  "╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║"
);
console.log(
  " ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝"
);
console.log(
  "---------------------------------------------------------------------------------"
);

const option = process.argv.splice(3)[0];
const action = process.argv.splice(2)[0];

if (
  (action && option && action === "generate" && option === "app") ||
  option === "module"
) {
  try {
    require(path.join(__dirname, "generator", option));
    return;
  } catch (e) {
    console.error(e);
  }
}

console.log("Usage:");
console.log("npm run generate-app");
console.log("npm run generate-module");
console.log("Or Globally");
console.log("webux generate app");
console.log("webux generate module");
