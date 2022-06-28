// initial
const express = require('express');
const app = express();

const cors = require('cors');

// import dotenv and call config function to load environment
require('dotenv').config();

// import package
const http = require('http');
const { Server } = require('socket.io');

// add after app initialization
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // define client origin if both client and server have different origin
  },
});

require('./src/socket')(io);

// Get routes to the variabel
const router = require('./src/routes');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// Add endpoint grouping and router
app.use('/api/v1/', router);
// add route here to serving static file
app.use('/uploads', express.static('uploads'));

app.get('/', function (req, res) {
  res.send({
    message: 'Hello Sodikul',
  });
});

server.listen(port, () => console.log(`Listening on port ${port}!`));
