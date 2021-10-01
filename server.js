require("dotenv").config();
const settings = require('./settings');
const app = require('./app');

app.listen(settings.port, function () {
  console.log("Example app listening on port 8000!");
});
