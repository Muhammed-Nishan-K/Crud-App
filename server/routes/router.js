const express = require("express");
const axios = require("axios");
const route = express.Router();
const controller = require("../controller/controller");
const userDb = require("../model/model");

// custom admin middle ware
function isAuthenticate(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/admin");
  }
}

function notAuthenticate(req, res, next) {
  if (req.session.isAuth) {
    res.redirect("/adminHome");
  } else {
    next();
  }
}

function isUserAuthenticate(req, res, next) {
  if (req.session.isUserAuth) {
    next();
  } else {
    res.redirect("/login");
  }
}

function notUserAuthenticate(req, res, next) {
  if (req.session.isUserAuth) {
    res.redirect("/");
  } else {
    next();
  }
}

//end of custom admin middle ware

route.get("/admin", notAuthenticate, notUserAuthenticate, (req, res) => {
  res.render("admin");
});

route.post("/admin", (req, res) => {
  const password = "1234";
  const userName = "admin";

  const inputPassword = req.body.pass;
  const inputUserName = req.body.name;

  if (password === inputPassword && userName === inputUserName) {
    req.session.isAuth = true;
    res.redirect("/adminHome");
  } else {
    res.redirect("/admin");
  }
});

route.get("/adminHome", isAuthenticate, (req, res) => {
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("adminHome", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
});

route.get("/add-user", notUserAuthenticate, (req, res) => {
  res.render("add-user");
});

route.get("/update_user", (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { users: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
});

route.post("/ad-logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin");
});

// usersLogin / register
route.get("/", isUserAuthenticate, (req, res) => {
  req.session.emailIsValid = false;
  req.session.notCorrect = false;
  res.render("home", { Uname: req.session.Uname });
});

route.get("/login", notUserAuthenticate, notAuthenticate, (req, res) => {
  req.session.emailIsValid = false;
  res.render("login", { notCorrect: req.session.notCorrect });
});

route.post("/login", (req, res) => {
  userDb
    .findOne({ email: req.body.email, pass: req.body.pass })
    .then((user) => {
      if (user) {
        req.session.isUserAuth = true;
        req.session.Uname = user.name.toUpperCase();
        res.redirect("/");
      } else {
        req.session.notCorrect = true;
        res.redirect("/login");
      }
    })
    .catch((err) => {
      res.status(500).redirect("/login");
    });
});

route.get("/register", notUserAuthenticate, notAuthenticate, (req, res) => {
  req.session.notCorrect = false;
  res.render("register", { emailIsValid: req.session.emailIsValid,Uemail:req.session.Uemail });
});

route.post("/register1", (req, res) => {
  const user = new userDb(req.body);
  user
    .save()
    .then((data) => {
      res.redirect("/login");
    })
    .catch((err) => {
      req.session.emailIsValid = true;
      req.session.Uemail=req.body.email;
      res.redirect("/register");
    });
});

route.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;
