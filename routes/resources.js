

const express = require('express');
const router  = express.Router();




module.exports = (db) => {
  router.get("/", (req, res) => {
    if(req.session.userId) {
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
         resources: resources
       };
       db.query (`SELECT * FROM users WHERE id = $1;`, [req.session.userId])
      .then(data => {
          const user = data.rows[0];
          templateVars.user = user;
          res.render("main", templateVars);
        })
        .catch(e => res.send(e))
      })
      .catch(err => {
        console.log("ERROR____", err.message);
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      res.redirect("/users/login");
    }
  });

  router.get("/resource", (req, res) => {
    // resourceQueries.allResources(db);
    db.query(
      `SELECT resources.title, resources.id, resources.description, resources.url, categories.name, likes.like_amount, ratings.rating, users.user_name
       FROM resources
       JOIN comments ON resources.id = comments.resource_id
       JOIN likes ON resources.id = likes.resource_id
       JOIN ratings ON resources.id = ratings.resource_id
       JOIN users ON resources.user_id = users.id
       JOIN categories ON categories.id = resources.category_id
       JOIN saves ON resources.id = saves.resource_id
       WHERE saves.user_id = $1
       GROUP BY resources.title, resources.id, resources.description, resources.url, categories.name, likes.like_amount, ratings.rating, users.user_name;
       `, [req.session.userId]
    )
      .then((data) => {
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
          category: resources.name,
        };

        const user = data.rows[0];
        templateVars.user = user;
        res.render("resource", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/profile", (req, res) => {
    // resourceQueries.allResources(db);
    db.query(
      `SELECT resources.title, resources.id, resources.description, resources.url, categories.name, likes.like_amount, ratings.rating, users.user_name
       FROM resources
       JOIN comments ON resources.id = comments.resource_id
       JOIN likes ON resources.id = likes.resource_id
       JOIN ratings ON resources.id = ratings.resource_id
       JOIN users ON resources.user_id = users.id
       JOIN categories ON categories.id = resources.category_id
       JOIN saves ON resources.id = saves.resource_id
       WHERE saves.user_id = $1
       GROUP BY resources.title, resources.id, resources.description, resources.url, categories.name, likes.like_amount, ratings.rating, users.user_name;
       `, [req.session.userId]
    )
      .then((data) => {
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
          category: resources.name,
        };

        const user = data.rows[0];
        templateVars.user = user;
        res.render("profile", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.post("/save-resource/:resource_id", (req, res) => {
    const userId = 1;
    const resourceId = req.params.resource_id;
    const values = [userId, resourceId];
    db.query(
      `INSERT INTO saves (user_id, resource_id)
       VALUES ($1, $2 ),`,
      values
    )
      .then((data) => {
        console.log(data.rows);
        // const users = data.rows;
        // res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete("/remove-resource", (req, res) => {
    const userId = 1;
    const resourceId = req.body.resourceId;
    const values = [userId, resourceId];
    console.log(req.body);
    db.query(
      `DELETE FROM saves
     WHERE resource_id = $2 AND user_id = $1;`,
      values
    )

      .then((data) => {
        console.log(data.rows);
        // const users = data.rows;
        // res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
