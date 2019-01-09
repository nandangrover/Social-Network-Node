const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const app = express();
const server = require('http').createServer(app);
const passport = require("passport");
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

app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use('/api/users', users);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;

//Socket IO
// io.configure(() => {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

io.on('connection', (client) => {
  client.on('update', (data) => {
    io.sockets.emit('update', { message: data.message });
  })
  client.on('disconnect', function () {
    console.log("disconnect __________________");

  });
});
server.listen(port, () => console.log(`Server started on port ${port}`));

// io.listen(port);
console.log('listening on port ', port);