let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

// const allResources = function(db) {

//   return db.query(`
//   SELECT resources.title, resources.description, resources.url, categories.name, comments.comment, likes.like_amount , ratings.rating, users.user_name
//        FROM resources
//        JOIN comments ON resources.id = comments.resource_id
//        JOIN likes ON resources.id = likes.resource_id
//        JOIN ratings ON resources.id = ratings.resource_id
//        JOIN users ON resources.user_id = users.id
//        JOIN categories ON categories.id = resources.category_id
//        GROUP BY resources.title, resources.description, resources.url, categories.name, comments.comment, likes.like_amount , ratings.rating, users.user_name`)
//        .then(res => {
//         if (res) {
//           return res.rows;
//         } else {
//           console.log('ERROR in getting all data from resources');
//           return null;
//         }
//       })
//       .catch(err => console.error('query error', err.stack));

// }
// dbParams.allResources = allResources;

// const addNewUser = function(db, body) {
//   return db.query(`
//   INSERT INTO users (user_name, email, password)
//   VALUES ($1, $2, $3)
//   RETURNING *;
//   `, [body.user_name, body.email, body.password])
//   .then(res => {
//     if (res) {
//       return res.rows[0];
//     } else {
//       console.log('ERROR in getting all data from my resources');
//       return null;
//     }
//   })
//   .catch(err => console.error('query error', err.stack));
// };
// dbParams.addNewUser = addNewUser;

// module.exports = {allResources}
module.exports = dbParams;
