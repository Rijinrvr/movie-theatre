var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var db = require("./config/db");
var session = require("express-session");
const cors = require("cors");

//--Routes---------------------------------------------

var adminRouter = require("./routes/admin");
var user=require("./routes/user")

var app = express();
app.use(cors());
app.use(express.json());

//--Mongodb connection----------------------------------

db.on("error", function (err) {
  console.log(err);
});

db.once("open", function () {
  console.log("Connected to mongodb");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//--session---------------------------------------------------------------

app.use(session({ secret: "Movie-kit", cookie: { maxAge: 6000000 } }));

app.use(
  cors({
    origin: ["http://localhost:3001/admin/"],
  })
);

//--routes-----------------------------------------------------------------

app.use("/", adminRouter);
app.use("/user", user);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
