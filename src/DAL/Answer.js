const db = require("./db");

function getByUserId(id) {
  return db.query("SELECT * FROM main.answers WHERE discord_user = $1;", [id]);
}

function create({ author, text, server, tech, questionId}) {
  return db.query(
    `INSERT INTO main.answers
    (discord_user, answer_text, discord_server, tech, question_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING id;`,
    [author, text, server, tech, questionId]
  );
}

module.exports = {
  getByUserId,
  create,
};
