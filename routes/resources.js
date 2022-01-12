

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
        console.log("ERROR____", err.message)
        res
          .status(500)
          .json({ error: err.message });
      });
  });

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
      db.query (`SELECT * FROM users WHERE email = $1, $2;`, [email, password])
      .then(user => {
          if (!user) {
            res.send({error: "error"});
            return;
          }
          req.session.userId = user.id;
          console.log("RESPONSE____")
          res.send({user: {name: user.name, email: user.email, id: user.id}});
        })
        .catch(e => res.send(e))
        return res.redirect("/main")
      })
  router.get("/login", (req, res) => {
    res.render("login")
  })
  router.get("/register", (req, res) => {
    res.render("register")
  })
  return router;
};
