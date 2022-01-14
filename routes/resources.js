const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.userId) {
      db.query(
        `SELECT resources.title, resources.id as resource_id, resources.description, resources.url, categories.name, comments.comment, likes.like_amount , ratings.rating, users.user_name
       FROM resources
       JOIN comments ON resources.id = comments.resource_id
       JOIN likes ON resources.id = likes.resource_id
       JOIN ratings ON resources.id = ratings.resource_id
       JOIN users ON resources.user_id = users.id
       JOIN categories ON categories.id = resources.category_id
       GROUP BY resources.title, resources.id, resources.description, resources.url, categories.name, comments.comment, likes.like_amount , ratings.rating, users.user_name;`
      )
        .then((data) => {
          const resources = data.rows;
          const templateVars = {
            resources: resources,
          };
          db.query(`SELECT * FROM users WHERE id = $1;`, [req.session.userId])
            .then((data) => {
              const user = data.rows[0];
              templateVars.user = user;
              res.render("main", templateVars);
            })
            .catch((e) => res.send(e));
        })
        .catch((err) => {
          console.log("ERROR____", err.message);
          res.status(500).json({ error: err.message });
        });
    } else {
      res.redirect("/users/login");
    }
  });

  router.get("/resource", (req, res) => {
    // resourceQueries.allResources(db);
    if (req.session.userId) {
      db.query(
        `SELECT resources.title, resources.id, resources.description, resources.url, categories.name, likes.like_amount, ratings.rating, users.user_name
       FROM resources
       JOIN comments ON resources.id = comments.resource_id
       JOIN likes ON resources.id = likes.resource_id
       JOIN ratings ON resources.id = ratings.resource_id
       JOIN users ON resources.user_id = users.id
       JOIN categories ON categories.id = resources.category_id
       JOIN saves ON resources.id = saves.resource_id
       WHERE saves.user_id = 1
       GROUP BY resources.title, resources.id, resources.description, resources.url, categories.name, likes.like_amount, ratings.rating, users.user_name
       `
      )
        .then((data) => {
          const resources = data.rows;
          //  console.log(data.rows);
          console.log("resources____", resources);
          console.log("resource title:", resources.title);

          const templateVars = {
            resources: resources,
            user: null,
          };
          console.log(resources);
          // const user = data.rows[0];
          // templateVars.user = user;
          res.render("resource", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  router.post("/save/:resource_id", (req, res) => {
    console.log(req.body);
    const userId = 2;
    const resourceId = req.params.resource_id;
    const values = [userId, resourceId];
    console.log("values:", values);
    db.query(
      `SELECT *
    FROM saves
    WHERE user_id = $1 AND resource_id = $2`,
      values
    ).then((result) => {
      if (result.rows.length > 0) {
        console.log("data already exists");
        return res.json({
          resource: result.rows[0],
          message: "data already exists",
        });
      }
      db.query(
        `INSERT INTO saves (user_id, resource_id)
       VALUES ($1, $2 ) returning *;`,
        values
      )
        .then((data) => {
          console.log("=====", data.rows);
          // const users = data.rows;
          res.json({ resource: data.rows[0] });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
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
