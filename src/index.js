import "dotenv/config";

Sentry.init({ dsn: 'https://2212f7d470844761a77920ea9eb6f89c@o435411.ingest.sentry.io/5394671' });

const express = require("express");
const mountRoutes = require("./routes");

const app = express();
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mountRoutes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started Correctly");
});
