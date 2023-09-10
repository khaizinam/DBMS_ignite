const dotenv = require("dotenv");
dotenv.config();
// ---------------
const app = require("./routes/index");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
