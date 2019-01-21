const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const users = require("./routes/api/users");
const app = express();
const server = require("http").createServer(app);
const passport = require("passport");
const io = require("socket.io")(server);
const items = require("./routes/api/items");
const chats = require("./routes/api/chats");
// const socketItems = require("./routes/api/items")(io)

app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to Mongo

mongoose
  .connect(
    db,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDb connected ..."))
  .catch(err => console.log(err));

app.use("/api/items", items);

app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
//Chats route
app.use("/api/chats", chats)

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// const io = require("socket.io").listen(server);
const port = process.env.PORT || 5000;
// const port = 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));

//Socket IO
// io.configure(() => {as
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

io.on("connection", client => {
  client.on("update", data => {
    io.sockets.emit("update", { message: data.message });
  });
  client.on("delete", data => {
    io.sockets.emit("delete", { message: data.message });
  });
  client.on("disconnect", function() {
    console.log("disconnect __________________");
  });
  client.on("privateChat", data => {
    // console.log(client.id);
    // client.join(data.room);
    // console.log(io.nsps);
    // console.log("heree", data.room);
    
    io.sockets.emit(`${data.room}`, { message: data.message });
  //  privateConnection(data)
    // const nsp = io.of(`/${data.room}`);
    // nsp.emit('hi', 'Hello everyone!');
    // io.in(`privateChat`).emit(`${data.room}`, {msg: 'hello'});
    // io.in(`${data.room}`).emit(`${data.room}`, {message: data.message})
  })
});

function privateConnection(data){
// console.log(data, "inside private");

const nsp = io.of(`/${data.room}`);
nsp.on('connection', function(socket) {
  //  console.log('someone connected');
   nsp.emit(`${data.room}`, {message: data.message});
});
}

// io.listen(port);
console.log("listening on port ", port);
