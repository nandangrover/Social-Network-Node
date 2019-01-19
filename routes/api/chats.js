const express = require("express");
const router = express.Router();

const Chats = require("../../models/Chats");
const Tree = require("../../models/Tree");
// const io = require("../../server");

// const app = express();

router.get("/tree/:id", (req, res) => {
  // const v = req.params;
  // console.log(req.params);
  // res.json("heloo")
  Tree.find({ user: req.params.id })
    // .sort({
    //   date: -1
    // })
    .then(users => res.json(users));
});

router.get("/:id", (req, res) => {
  // const v = req.params;
  // console.log(req.params);
  // res.json("heloo")
  Chats.find({ chatId: req.params.id })
    // .sort({
    //   date: -1
    // })
    .then(users => res.json(users));
});

router.post("/", (req, res) => {
  const newChat = new Chats({
    from: req.body.from,
    to: req.body.to,
    text: req.body.text,
    chatId: req.body.chatId,
  });
  newChat.save().then(chat => {
    res.json(chat);
    // });
  });
  // .then(() => {
  // global.io.sockets.on("connection", client => {
  // });
  // newItem.save().then(item => {
  //   exports = module.exports = io => {
  //     io.sockets.on("connection", client => {
  //       io.sockets.emit("update", { message: res.json(item) });
  //     });
  //   };
  // })
});

router.post("/tree", (req, res) => {
  const newTree = new Tree({
    user: req.body.user,
    chatId: req.body.chatId,
  });
  newTree.save().then(user => {
    res.json(user);
  });
});

router.delete("/:id", (req, res) => {
  Chats.findById(req.params.id)
    .then(item => item.remove())
    .then(() =>
      res.json({
        success: true
      })
    )
    .catch(err =>
      res.status(404).json({
        success: false
      })
    );
});

module.exports = router;
