// ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
// ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: {{moduleFilename}}
 * Author: {{author}}
 * Date: {{creationDate}}
 * License: {{license}}
 */

"use strict";

module.exports = db => {
  
  // Do your magic ! check mongoose for more details
  let {{moduleName}} = db.Schema(
    {
      
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );

  // indexes

  // pre/post functions

  return db.model("{{modelName}}", {{moduleName}});
};
