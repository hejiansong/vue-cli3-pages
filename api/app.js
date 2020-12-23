const path = require('path');
const express = require('express');
const http = require('http')
const mockjs = require('express-mockjs');

const port = 8090;
const app = express()
const server = http.createServer(app);

app.use('/backend/api', mockjs(path.join(__dirname, 'mocks')))

server.listen(port);
server.on('listening',()=>{
  console.log(`Listening on http://localhost:${port}/backend/api`)
})