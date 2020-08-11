const { User } = require("../DAL");
const Router = require("express-promise-router");

const router = new Router();

module.exports = router;

// Get User By Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await Question.getById(id);
  res.send(rows[0]);
});

// Get User By DiscordId
router.get("/discordId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await User.getByDiscordId(id);
    res.send(rows[0]);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Create user
// Expected payload:
// {
//   username: Number,
//   discordId: Number,
// }
router.post("/", async (req, res) => {
  const {
    body: { username, discordId },
  } = req;

  if (!username || !discordId) {
    res.status(422).send("Username and DiscordId are required");
  }
  const { rows: userRows } = await User.getByDiscordId(discordId);

  if (userRows.length > 0) {
    res.status(409).send("User already exists");
    return;
  }

  try {
    const { rows } = await User.create({ discordId, username });
    res.status(200).send(rows[0]);
  } catch (e) {
    return res.status(500).send(e);
  }
});
