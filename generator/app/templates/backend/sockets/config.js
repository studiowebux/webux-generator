// ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
// ██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
// ███████╗██║   ██║██║     █████╔╝ █████╗     ██║
// ╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
// ███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
// ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝

/**
 * File: config.js
 * Author: Tommy Gingras
 * Date: 2019-05-25
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const config = require('../config/config');
const socketio = require('socket.io');
const isAuthenticated = require('../middleware/auth/isAuthenticated');
const socket = socketio(config.socketio);

const authenticate = (socket, data, callback) => {
  console.log('auth socket');
  console.log(data);
  const req = {headers: {authorization: data.accessToken.toString()}};
  isAuthenticated(req, null, (err, user) => {
    if (err || !user) {
      return callback(err || 'Not authenticated');
    }

    console.log(user);
    return callback(null, user);
  });
};

const postAuthenticate = (socket, user) => {
  console.log('postauth socket');
  socket.client.user = user;
  console.log(user);
};

const disconnect = (socket) => {
  console.log(socket.id + ' disconnected');
};

require('socketio-auth')(socket, {
  authenticate: authenticate,
  postAuthenticate: postAuthenticate,
  disconnect: disconnect,
  timeout: 1000, // time for the client to authenticate
});

module.exports = socket;
