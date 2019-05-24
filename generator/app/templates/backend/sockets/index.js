const io = require('./config');

io.on('connection', (client) => {
  console.log('New Connection ID = ' + client.id);

  // put the listeners below
  client.on('doSomething', () => {
    if (!client.auth) {
      client.emit('unauthorized', {message: 'Unauthorized'});
      return;
    }
    console.log('doSomething called ');
    client.emit('sendSomething', []);
  });
});
