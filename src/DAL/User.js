const db = require("./db");

function getById(id) {
  return db.query("SELECT * FROM main.local_users WHERE id = $1;", [id]);
}

function getByDiscordId(id) {
  return db.query("SELECT * FROM main.local_users WHERE discord_id = $1;", [
    id,
  ]);
}

function create({ discordId, username }) {
  return db.query(
    `INSERT INTO main.local_users
    (discord_id, username)
    VALUES($1, $2)
    RETURNING id;`,
    [discordId, username]
  );
}

export default {
  getById,
  getByDiscordId,
  create,
};
