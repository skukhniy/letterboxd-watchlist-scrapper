var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// configs dotenv so the database URL can be grabbed from the env file
dotenv.config();

// connect to DB
const mongoDB = process.env.DATABASE_URL;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// if successfully connected, console log
db.on("connected", () => {
	console.log("connected to database");
});

// init express
var app = express();

// routers
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: "http://localhost:3000", // allow to server to accept request from different origin
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true, // allow session cookie from browser to pass through
	})
);
app.get("/", function (req, res) {
	res.sendFile("build", "index.html");
});
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(flash());

// init routers
app.use("/", indexRouter);
app.use("/api/", apiRouter);

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
