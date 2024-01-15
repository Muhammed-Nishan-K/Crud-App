const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path = require("path");

const app = express(); // app of express

const session = require("express-session");

// const axios = require("axios"); // to call custom url

// const userDb = require("./server/model/model");

// let userEmail;

const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 5000;

//mongoDB connection
connectDB();

//Custom middleware
// function isAuthenticate(req, res, next) {
//   if (req.session.isAuth) {
//     next();
//   } else {
//     res.redirect("/admin");
//   }
// }

// function notAuthenticate(req, res, next) {
//   if (req.session.isAuth) {
//     res.redirect("/adminHome");
//   } else {
//     next();
//   }
// }
///dele

// function isUserAuthenticate(req, res, next) {
//   if (req.session.isUserAuth) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// }

// function notUserAuthenticate(req, res, next) {
//   if (req.session.isUserAuth) {
//     res.redirect("/");
//   } else {
//     next();
//   }
// }

// end of custom middleware

// Configure session
app.use(
  session({
    secret: "key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Parse request body
app.use(bodyparser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// Serve static assets
app.use("/css", express.static(path.join(__dirname, "assets/css")));
app.use("/js", express.static(path.join(__dirname, "assets/js")));
app.use("/img", express.static(path.join(__dirname, "assets/img")));

// Define your routes

// app.get("/", isUserAuthenticate, (req, res) => {
//   req.session.emailIsValid = false;
//   req.session.notCorrect = false;
//   res.render("home", { Uname: req.session.Uname });
// });

// app.get("/login", notUserAuthenticate, (req, res) => {
//   req.session.emailIsValid = false;
//   res.render("login",{notCorrect: req.session.notCorrect});
// });

// app.post("/login", (req, res) => {
//   userDb
//     .findOne({ email: req.body.email, pass: req.body.pass })
//     .then((user) => {
//       if (user) {
//         req.session.isUserAuth = true;
//         req.session.Uname = user.name.toUpperCase();
//         res.redirect("/");
//       }else{
//         req.session.notCorrect = true;
//         res.redirect('/login');
//       }
//     })
//     .catch((err) => {
//       res.status(500).redirect("/login");
//     });
// });

// app.get("/register", notAuthenticate, (req, res) => {
//   req.session.notCorrect = false;
//   res.render("register", { emailIsValid: req.session.emailIsValid });
// });

// app.post("/register1", (req, res) => {
//   const user = new userDb(req.body);
//   user
//     .save()
//     .then((data) => {
//       res.redirect("/login");
//     })
//     .catch((err) => {
//       req.session.emailIsValid = true;
//       res.redirect("/register");
//     });
// });

// app.post("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/login");
// });

app.use("/", require("./server/routes/router"));

app.use("/", require("./server/routes/notfound"));

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
