import "dotenv/config";
const express = require("express");
const mountRoutes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mountRoutes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started Correctly");
});
