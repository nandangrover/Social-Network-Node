const express = require("express");
const router = express.Router();

const Chats = require("../../models/Chats");
const Tree = require("../../models/Tree");
const User = require("../../models/User");
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

router.get("/chatHistory/:id", (req, res) => {
  const userArr = [];
  Tree.find({ user: req.params.id })
    .sort({
      date: -1
    })
    .then(users => {
    //   users.forEach((item) => {
      // item.user.filter((userElem) => {
      //   if(userElem !== req.params.id){
    //       // userArr.push({userTree: item, username: "username.username"});
    //       User.findById(userElem)
    //       .then((username) => {
    //         userArr.push({userTree: item, username: username.username});
    //         res.json(userArr);
    //         // return userElem;
    //       })  
    //     }
    //   })    
    // })
    res.json(users);
  }
  )
})

router.get("/chatHistory/user/:id", (req, res) => {
    User.findById(req.params.id)
    .then((username) => {
      res.json(username.username)
    })
})


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
  });
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

function getUsers() {
   let promise = new promise((res, rej) => {
    setTimeout(() => {
      resolve("completed")
    }, 100);
   })
   return promise;
}

module.exports = router;
