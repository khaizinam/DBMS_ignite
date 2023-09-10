const express = require("express");

const app = express();
const { insert, createTable, find } = require("../common/ignite/igniteSQL");

app.get("/", async (req, res) => {
  await createTable({
    table: "person",
    columns: ["firstName VARCHAR", "lastName VARCHAR", "salary DOUBLE"],
  });
  await insert(
    "INSERT INTO person (id, firstName, lastName, salary) values (1, 'john', 'kênade', 2000),(2, 'john', 'kenedy', 2000)"
  );
  const founds = await find("SELECT * FROM person");
  console.log(founds);
  res.send("TypeScript With Express");
});

module.exports = app;
