const user = require("./user");
const question = require("./question");
const tech = require("./tech");
const answer = require("./answer");
// const photos = require('./photos')

module.exports = (app) => {
  app.use("/user", user);
  app.use("/question", question);
  app.use("/answer", answer);
  app.use("/tech", tech);
  //   app.use('/photos', photos)
  // etc..
};
