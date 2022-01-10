
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("main")
  })
  router.get("/login", (req, res) => {
    res.render("login")
  })
  router.get("/register", (req, res) => {
    res.render("register")
  })
  // router.get("/register", (req, res) => {
  //   res.render("register")
  // })
  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
};
