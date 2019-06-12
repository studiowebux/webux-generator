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

 const path = require('path');

console.log("██╗    ██╗███████╗██████╗ ██╗   ██╗██╗  ██╗    ██╗      █████╗ ██████╗ ");
console.log("██║    ██║██╔════╝██╔══██╗██║   ██║╚██╗██╔╝    ██║     ██╔══██╗██╔══██╗");
console.log("██║ █╗ ██║█████╗  ██████╔╝██║   ██║ ╚███╔╝     ██║     ███████║██████╔╝");
console.log("██║███╗██║██╔══╝  ██╔══██╗██║   ██║ ██╔██╗     ██║     ██╔══██║██╔══██╗");
console.log("╚███╔███╔╝███████╗██████╔╝╚██████╔╝██╔╝ ██╗    ███████╗██║  ██║██████╔╝");
console.log(" ╚══╝╚══╝ ╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═════╝ ");

console.log("---------------------------------------------------------------------------------")
console.log("█████╗ ██████╗ ██╗");
console.log("██╔══██╗██╔══██╗██║");
console.log("███████║██████╔╝██║");
console.log("██╔══██║██╔═══╝ ██║");
console.log("██║  ██║██║     ██║");
console.log("╚═╝  ╚═╝╚═╝     ╚═╝");
console.log("██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗ ");
console.log("██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗");
console.log("██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝");
console.log("██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗");
console.log("╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║");
console.log(" ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝");
console.log("---------------------------------------------------------------------------------")


const option = process.argv.splice(3)[0];
const action = process.argv.splice(2)[0];
console.log(option)
console.log(action)
if(action && option && action === 'generate' && option === 'app' || option === 'module'){
  require(path.join(__dirname, 'generator', option));
  return;
}

console.log("Usage:")
console.log("npm run generate-app")
console.log("npm run generate-module")
console.log("Or Globally")
console.log("webux generate app")
console.log("webux generate module")