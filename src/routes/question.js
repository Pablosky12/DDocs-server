const { Question } = require("../DAL");
const Router = require("express-promise-router");

const router = new Router();

module.exports = router;

// Get Question By Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await Question.getById(id);
  if (rows.length) {
    res.send(rows[0]);
  } else {
    res.status(404).send(`No question found with id ${id}`);
  }
});

//This is awful, just keeping it to move forward with the POC
router.post("/query", async (req, res) => {
  const { text } = req.body;
  const { rows } = await Question.getByExactText(text);

  console.log(text);
  if (rows.length) {
    res.send(rows[0]);
  } else {
    res.status(404).send(`No question found with discord provided text`);
  }
});

router.get("/discord/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await Question.getByDiscordId(id);
  if (rows.length) {
    res.send(rows[0]);
  } else {
    res.status(404).send(`No question found with discord id ${id}`);
  }
});

router.post("/", async (req, res) => {
  const {
    body: { author, text, server, tech, discordMsgId},
  } = req;


  if (!author || !text || !server || !tech || !discordMsgId) {
    res.status(422).send("author, text, server, discordMsgId, and tech are required");
    return;
  }

  try {
    const { rows } = await Question.create({ author, text, server, tech, discordMsgId });
    res.status(200).send(rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});
