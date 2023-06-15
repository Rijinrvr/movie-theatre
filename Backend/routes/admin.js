var express = require("express");
var router = express.Router();
var { Admin } = require("../models/admin");
var { Movie } = require("../models/movies");


const isUser = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
};

//--Home-------------------------------------------

router.get("/", (req, res) => {
  Movie.find({}).then((movie) => {
    res.render("admin/list", { movies: movie });
  });
});

router.get("/list", (req, res) => {
  Movie.find({}).then((movie) => {
    const movielist = res.json(movie);
  });
});

//--Add----------------------------------------------

router.get("/add", (req, res) => {
  res.render("admin/add");
});
router.post("/add", (req, res) => {
  let movie = new Movie({
    title: req.body.title,
    imageurl: req.body.imageurl,
    treaterName: req.body.treaterName,
    price: req.body.price,
  });
  console.log(req.body);
  movie.save().then(() => {
    res.redirect("/");
  });
});

//--View---------------------------------------------

router.get("/view/:id", (req, res) => {
  let id = req.params.id;
  Movie.findById(id).then((movie) => {
    res.render("admin/view", { movie: movie });
  });
});

router.get("/list/:id", (req, res) => {
  let id = req.params.id;
  Movie.findById(id).then((movie) => {
    const movielist = res.json(movie);
    console.log(movielist);
  });
});
//--Edit--------------------------------------------

router.get("/view/edit/:id", (req, res) => {
  let id = req.params.id;
  
  Movie.findById(id).then((movie) => {
    res.render("admin/edit", { movie: movie });
    console.log(movie);
  });

  router.post("/edit/:id", (req, res) => {
    let query = {
      _id: req.params.id,
    };
    let movie = {
      title: req.body.title,
      imageurl: req.body.imageurl,
      treaterName: req.body.treaterName,
      price: req.body.price,
    };
    Movie.updateOne(query, movie).then(() => {
      res.redirect("/");
    });
  });
});

//--Delete-----------------------------------------

router.get("/view/delete/:id", (req, res) => {
  let id = {
    _id: req.params.id,
  };
  Movie.deleteOne(id).then(() => {
    res.redirect("/");
  });
});

//--Login-------------------------------------------

router.get("/login", (req, res) => {
  res.render("admin/login");
});
router.post("/login", (req, res) => {
  let query = {
    username: req.body.username,
    password: req.body.password,
  };
  Admin.findOne(query).then((login) => {
    req.session.username = login.username;
    res.redirect("/");
  });
});


//--Signup--------------------------------------------

router.get("/signup", (req, res) => {
  res.render("admin/signup");
});

router.post("/signup", (req, res) => {
  let admin = new Admin({
    username: req.body.username,
    password: req.body.password,
  });
  admin.save().then((signup) => {
    console.log(signup);
    res.redirect("/login");
  });
});

//--Logout--------------------------------------------

router.get("/logout", (req, res) => {
  console.log(req.session.username);
  req.session.username = "";
  console.log(req.session.username);
  res.redirect("/login");
});

module.exports = router;
