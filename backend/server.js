require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const route = require('./routers/route.js');

app.use(cors({ origin: '*' }));
// app.use(express.json());
app.use(express.urlencoded({ limit:'2mb',extended: false }));

app.use('/', route);

const port = process.env.PORT || '8081';
app.set(port);

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
  console.log(`server listening at localhost:${port}`);
});
server.on('error', () => {
  console.error('app is not listening');
});
module.exports = app;
