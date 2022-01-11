const allResources = function(db) {
  
  return db.query(`
  SELECT * FROM resources;`)
  .then(res => {
    if(res) {
      return res.rows;
    } else {
      return null
    }
  })
  .catch ((err) => {
    console.log(err.message);
  })

}

module.exports = {allResources}
