/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Adding a new user

  router.post("/register", (req, res) => {

    db.query(`INSERT INTO users(user_name, email, password)
    VALUES($1 ,$2, $3)
    RETURNING *;`, [req.body.name, req.body.email, req.body.password])
    .then((result) => {
      result.rows

    }

    )
    .catch((err) => {
      console.log(err.message)
    })
    return res.redirect("/login")
  })

  //Log in a user


    router.post("/login", (req, res) => {
      const {email, password} = req.body;
      db.query (`SELECT * FROM users WHERE email = $1 AND password = $2;`, [email, password])
      .then(data => {
          const user = data.rows[0];
          req.session.userId = user.id;
          // console.log("HI ----", user.rows[0]);
          res.redirect("/resources/")

        })
        .catch(e => res.send(e))

      })
  router.get("/login", (req, res) => {
    res.render("login", {user: null});
  })
  router.post("/logout", (req, res) => {

    req.session = null;
    res.redirect("/users/login");
  });
  router.get("/register", (req, res) => {
    res.render("register")
  })



  return router;
};
