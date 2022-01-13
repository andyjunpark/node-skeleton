
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const resourceQueries = require('../db/resources');

module.exports = (db) => {
  router.get("/", (req, res) => {
     resourceQueries.allResources(db)
     db.query(
       `SELECT resources.title, resources.description, resources.url, categories.name, comments.comment, likes.like_amount, ratings.rating, users.user_name
       FROM resources
       JOIN comments ON resources.id = comments.resource_id
       JOIN likes ON resources.id = likes.resource_id
       JOIN ratings ON resources.id = ratings.resource_id
       JOIN users ON resources.user_id = users.id
       JOIN categories ON categories.id = resources.category_id
       `)
     .then(data => {
       const resources = data.rows;
      //  console.log(data.rows);
       console.log("resources____", resources);

      const templateVars = {
        resources: resources,
        title: resources.title,
        description: resources.description,
        url: resources.url,
        comment: resources.comment,
        like: resources.like_amount,
        rating: resources.rating,
        user_name: resources.user_name,
        category: resources.name
      };
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

  router.get("/profile", (req, res) => {
    res.render("profile")
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
