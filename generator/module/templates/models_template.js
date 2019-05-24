// ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
// ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: {{filename}}.js
 * Author: {{author}}
 * Date: {{date}}
 * License: {{license}}
 */

'use strict';

const db = require('../config/db');

const {{action}}Schema = db.Schema(
    {
      /** your definition */
    },
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}
);

// example of index
// {{action}}Schema.index({name: 'text', shortcuts: 'text'});

module.exports = db.model('{{model}}', {{action}}Schema);
