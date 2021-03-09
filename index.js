const express = require('express');
const app = express();
const mongoose = require('mongoose');
const WebSocket = require('ws');
require('dotenv/config');

const PORT = process.env.PORT || 4000;
app.use(express.json());

const wss = new WebSocket.Server({ port: 4080 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`)
  })
  ws.send('ho!')
})
const todosRoute = require('./routes/todos');

app.use('/', todosRoute);

async function start() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION,
        {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        },
        () => {
          console.log('Connected to DB');
        });
    app.listen(PORT, () => {
      console.log('Server is listening');
    });
  } catch (e) {
    console.log(e);
  }
}

start();