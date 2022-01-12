

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT resources.title, resources.description, resources.url, categories.name, comments.comment, likes.like_amount , ratings.rating, users.user_name
       FROM resources
       JOIN comments ON resources.id = comments.resource_id
       JOIN likes ON resources.id = likes.resource_id
       JOIN ratings ON resources.id = ratings.resource_id
       JOIN users ON resources.user_id = users.id
       JOIN categories ON categories.id = resources.category_id
       GROUP BY resources.title, resources.description, resources.url, categories.name, comments.comment, likes.like_amount , ratings.rating, users.user_name;`)
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
  router.post("/register", (req, body) => {
    db.query(`
    INSERT INTO users (user_name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [body.user_name, body.email, body.password])
    .then(res => {
      if (res) {
        res.render("/login");
        return res.rows[0];
      } else {
        console.log('ERROR in getting all data from my resources');
        return null;
      }
    })
    .catch(err => console.error('query error', err.stack));
  })
  router.get("/login", (req, res) => {
    res.render("login")
  })
  router.get("/register", (req, res) => {
    res.render("register")
  })
  return router;
};
