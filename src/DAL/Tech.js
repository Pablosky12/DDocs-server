const db = require("./db");

function getById(id) {
  return db.query("SELECT * FROM main.techs WHERE id = $1;", [id]);
}

function getByName(name) {
  return db.query(
    "SELECT * FROM main.techs WHERE LOWER(display_name) = LOWER($1);",
    [name]
  );
}

function create({ name }) {
  return db.query(
    `INSERT INTO main.techs
    (display_name)
    VALUES($1)
    RETURNING id;`,
    [name]
  );
}

export default {
  getById,
  getByName,
  create,
};
