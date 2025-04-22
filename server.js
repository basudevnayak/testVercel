require("colors")
require("dotenv").config({
  path: ".env"
})
const app = require("./src/app");
const { ConnectDB } = require("./src/db/db.config");

ConnectDB()

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the server is listen at http://localhost:${port} `.red);
});