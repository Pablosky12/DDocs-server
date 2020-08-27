const { Answer } = require("../DAL");
const Router = require("express-promise-router");

const router = new Router();

module.exports = router;

// Get Answer By Id
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await Answer.getByUserId(id);
  if (rows.length) {
    res.send(rows[0]);
  } else {
    res.status(404).send(`No question found with id ${id}`);
  }
});

router.post("/", async (req, res) => {
  const {
    body: { author, text, server, tech, questionId, questionDiscordMsgId },
  } = req;
  console.log(author, text, server, tech, questionId);

  if (!author || !text || !server || !tech || !questionId) {
    res
      .status(422)
      .send("author, text, server, questionId and tech are required");
    return;
  }

  try {
    const { rows } = await Answer.create({
      author,
      text,
      server,
      tech,
      questionId,
    });
    res.status(200).send(rows[0]);
  } catch (e) {
    return res.status(500).send(e);
  }
});
