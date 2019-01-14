const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");
// const io = require("../../server");

// const app = express();

router.get("/", (req, res) => {
  Item.find()
    // .sort({
    //   date: -1
    // })
    .then(items => res.json(items));
});

router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    userName: req.body.userName,
    userId: req.body.userId
  });
  newItem.save().then(item => {
    // global.io.sockets.on("connection", client => {
    // res.json(item);
    res.json(item);
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

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
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
