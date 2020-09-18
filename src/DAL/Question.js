const db = require("./db");

function getById(id) {
  return db.query(
    `SELECT * FROM main.questions 
    LEFT JOIN main.answers a 
      on questions.id  = a.question_id
    WHERE main.questions.id = $1;`,
    [id]
  );
}

function getByDiscordId(id) {
  return db.query(
    `SELECT * FROM main.questions 
    LEFT JOIN main.answers a 
      on questions.discord_msg_id  = a.question_discord_msg_id  
    WHERE main.questions.discord_msg_id = $1;`,
    [id]
  );
}

function getByExactText(text) {
  return db.query(
    `SELECT q.id as qId,
    q.discord_user as qDiscordUser,
    q.question_text as qText, 
    q.discord_server as qDiscordServer,
    q.tech as qTech,
    discord_msg_id  as qDiscordMsgId FROM main.questions q 
    LEFT JOIN main.answers a
    ON q.discord_msg_id = a.question_discord_msg_id
    WHERE q.question_text=$1
    ORDER BY q.created_on ASC LIMIT 1;`,
    [text]
  );
}

function getByUserId(id) {
  return db.query("SELECT * FROM main.questions WHERE discord_user = $1;", [
    id,
  ]);
}

function getLatest() {
  return db.query(`select q.id as id,
  q.discord_user as discord_user,
  q.question_text as question_text,
  q.created_on as created_on,
  q.discord_server as discord_server,
  q.tech as tech,
  q.discord_msg_id as discord_msg_id,
  count(q.id) over () as total,
 count(a.question_id ) as answer_count
 from main.questions q
   left join main.answers a 
   on q.id = a.question_id 
 group by q.id
 order by 1 desc 
 limit 200;`);
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
  getByDiscordId,
  getByExactText,
};
