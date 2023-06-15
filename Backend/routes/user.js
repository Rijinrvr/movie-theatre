var express = require("express");
var router = express.Router();
var { User } = require("../models/user");
const jwt = require("jsonwebtoken");

//--Signup---------------------------------------------

router.get("/signup", (req, res) => {
  res.json({ message: "Signup Page" });
});
router.post("/signup", (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(user);
  user
    .save()
    .then((signup) => {
      res.json({ message: "signup Sucessfull" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//--Login-------------------------------------------------

router.get("/login", (req, res) => {
  res.json({ message: "Signup Page" });
})
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password }).then((user) => {
        if (user) {
       const token = jwt.sign(
         { username: user.username, password: user.password },
         "movie_threater_key",
         { expiresIn: "1h" }
       );
            res.json({token})
   }
})

})

module.exports = router;
