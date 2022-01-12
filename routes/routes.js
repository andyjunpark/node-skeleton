
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const dbParams = require('../lib/db.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    //  dbParams
    //  .allResources(db)
     db.query(
       `SELECT resources.title, resources.description, resources.url, categories.name, comments.comment, likes.like_amount , ratings.rating, users.user_name
       FROM resources
       JOIN comments ON resources.id = comments.resource_id
       JOIN likes ON resources.id = likes.resource_id
       JOIN ratings ON resources.id = ratings.resource_id
       JOIN users ON resources.user_id = users.id
       JOIN categories ON categories.id = resources.category_id
       GROUP BY resources.title, resources.description, resources.url, categories.name, comments.comment, likes.like_amount , ratings.rating, users.user_name;
       `)
     .then(data => {
       const resources = data.rows;
        const templateVars = {
        resources: resources,
      };

       res.render("main", templateVars);
     })
     .catch(err => {
       res
         .status(500)
         .json({ error: err.message });
     });
 });
//  router.post("/", (req, res) => {
//    db.query(
//      `INSERT INTO resources (url, title, description)
//      VALUES ($1, $2, $3)
//      RETURNING *;`[body.url, body.title, body.description])
//      .then(res => {
//        if (res) {
//          return res.rows[0];
//        } else {
//          console.log('ERROR in adding new resource');
//          return null;
//        }
//      })
//      .catch(err => console.error('query error', err.stack));
//  });

//  router.post("/register", (req, res) => {
//    db.query
//     .addNewUser(db, req.body )
//  })




  return router;
};
