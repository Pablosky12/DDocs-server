const { Tech } = require("../DAL");
const Router = require("express-promise-router");

const router = new Router();

module.exports = router;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await Tech.getById(id);
  if (rows.length) {
    res.send(rows[0]);
  } else {
    res.status(404).send(`No tech found with id ${id}`);
  }
});

router.post("/", async (req, res) => {
  const {
    body: { name },
  } = req;

  if (!name) {
    res.status(422).send("tech name is required");
  }

  const { rows: techRows } = await Tech.getByName(name);

  if (techRows.length > 0) {
    res.status(409).send("Tech already exists");
    return;
  }


  try {
    const { rows } = await Tech.create({ name });
    res.status(200).send(rows[0]);
  } catch (e) {
    return res.status(500).send(e);
  }
});
