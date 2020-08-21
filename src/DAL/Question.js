const db = require("./db");

function getById(id) {
  return db.query(
   `SELECT * FROM main.questions 
    JOIN answers 
      on questions.id  = answers.question_id
    WHERE main.questions.id = $1;`,
    [id]
  );
}

function getByDiscordId(id) {
  return db.query(
   `SELECT * FROM main.questions 
    JOIN answers 
      on questions.discord_msg_id  = answers.question_discord_msg_id  
    WHERE main.questions.discord_msg_id = $1;`,
    [id]
  );
}

function getByUserId(id) {
  return db.query("SELECT * FROM main.questions WHERE discord_user = $1;", [id]);
}

function getLatest() {
  return db.query("SELECT * FROM main.questions FETCH FIRST 200 ROWS ONLY;");
}

function getByTech(techId) {
  return db.query(
    "SELECT * FROM main.questions WHERE tech = $1 FETCH FIRST 200 ROWS ONLY;",
    [techId]
  );
}

function create({ author, text, server, tech, discordMsgId }) {
  return db.query(
    `INSERT INTO main.questions
    (discord_user, question_text, discord_server, tech, discord_msg_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING id;`,
    [author, text, server, tech, discordMsgId]
  );
}

module.exports = {
  getById,
  getByUserId,
  getByTech,
  create,
  getLatest,
  getByDiscordId
};
