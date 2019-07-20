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
  const {{moduleName}} = db.Schema(
    {
      // Do your magic ! check mongoose for more details
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  );

  return db.model("{{modelName}}", {{moduleName}});
};
