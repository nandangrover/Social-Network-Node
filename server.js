const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDb connected ...'))
  .catch(err => console.log(err));

app.use('/api/items', items);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}
const port = process.env.PORT || 5000;

//Socket IO

io.on('connection', (client) => {
  console.log("New client connected");
  client.on('new_message', (data) => {
    console.log(data);

    io.sockets.emit('new_message', { message: data.message });
  })
  client.on("disconnect", () => console.log("Client disconnected"));
});
server.listen(port, () => console.log(`Server started on port ${port}`));

// io.listen(port);
console.log('listening on port ', port);