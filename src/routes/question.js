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

router.post("/", async (req, res) => {
  const {
    body: { author, text, server, tech },
  } = req;


  if (!author || !text || !server || !tech) {
    res.status(422).send("author, text, server, and tech are required");
    return;
  }

  try {
    const { rows } = await Question.create({ author, text, server, tech });
    res.status(200).send(rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});
