
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const resourceQueries = require('../db/resources');

module.exports = (db) => {
  router.get("/", (req, res) => {
     resourceQueries.allResources(db)
     db.query('SELECT * FROM resources')
     .then(data => {
       const resources = data.rows[0];
       console.log("resources____", resources);

       const templateVars = { title: resources.title, description: resources.description, url: resources.url };
       console.log("templatevars____", templateVars);
       res.render("main", templateVars);
     })
     .catch(err => {
       res
         .status(500)
         .json({ error: err.message });
     });
 });




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
