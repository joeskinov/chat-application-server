const http = require('http');
const serverSocket = require('socket.io');
let env = require('./config').env;
let mongo = require('./config').mongo;
let port = require('./config').port;
let ip = require('./config').ip;
let apiRoot = require('./config').apiRoot;
let api = require('./api').router;
const mongoose = require('./services/mongoose').mongoose;
const express = require('./services/express').express;
const socket = require('./services/socket.io').socket;

const app = express(apiRoot, api);
const server = http.createServer(app);
const io = serverSocket(server);

socket(io);


mongoose.connect(mongo.uri);
mongoose.Promise = Promise;

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port);
  });
});