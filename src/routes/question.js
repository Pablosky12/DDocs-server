const { Question } = require("../DAL");
const Router = require("express-promise-router");
const { mapper } = require("./utils");

const router = new Router();

module.exports = router;

const questionMapping = {
  id: "id",
  discord_user: "discordUser",
  question_text: "text",
  created_on: "createdOn",
  discord_server: "server",
  tech: "tech",
  discord_msg_id: "discordMessageId",
  answer_count: "answerCount"
};

const answerMapping = {
  answer_text: "text",
  question_id: "questionId",
  id: "id",
};

// Get Latest Questions
router.get("/latest", async (req, res) => {
  const { rows } = await Question.getLatest();
  if (rows.length) {
    const questions = rows.map((row) => mapper(row, questionMapping));
    const total = rows[0].total;
    res.send({ questions, total });
  }
});

// Get Question By Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await Question.getById(id);
  if (rows.length) {
    const question = mapper(rows[0], questionMapping);
    let answers = [];
    if (rows.length > 1) {
      answers = rows.map((ans) => mapper(ans, answerMapping));
    }
    
    res.send({ ...question, answers });
  } else {
    res.status(404).send(`No question found with id ${id}`);
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
    body: { author, text, server, tech, discordMsgId },
  } = req;

  if (!author || !text || !server || !tech || !discordMsgId) {
    res
      .status(422)
      .send("author, text, server, discordMsgId, and tech are required");
    return;
  }

  try {
    const { rows } = await Question.create({
      author,
      text,
      server,
      tech,
      discordMsgId,
    });
    res.status(200).send(rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

//This is awful, just keeping it to move forward with the POC
router.post("/query", async (req, res) => {
  const { text } = req.body;
  const { rows } = await Question.getByExactText(text);

  if (rows.length) {
    res.send(rows[0]);
  } else {
    res.status(404).send(`No question found with discord provided text`);
  }
});
