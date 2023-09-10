const IgniteClient = require("@gridgain/thin-client");
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;
const CacheConfiguration = IgniteClient.CacheConfiguration;
const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
const { development } = require("./config");

async function insert(sql) {
  const igniteClientConfiguration = new IgniteClientConfiguration(
    development.host
  )
    .setUserName(development.username)
    .setPassword(development.password)
    .setConnectionOptions(true);
  // Connect to the cluster.
  const igniteClient = new IgniteClient();
  try {
    await igniteClient.connect(igniteClientConfiguration);
    const cache = await igniteClient.getOrCreateCache(
      "PUBLIC",
      new CacheConfiguration().setSqlSchema("PUBLIC")
    );
    (await cache.query(new SqlFieldsQuery(sql))).getAll();
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  } finally {
    igniteClient.disconnect();
  }
}

async function createTable(param = { table, columns }) {
  const igniteClientConfiguration = new IgniteClientConfiguration(
    development.host
  )
    .setUserName(development.username)
    .setPassword(development.password)
    .setConnectionOptions(true);
  const igniteClient = new IgniteClient();
  try {
    await igniteClient.connect(igniteClientConfiguration);
    const cache = await igniteClient.getOrCreateCache(
      "PUBLIC",
      new CacheConfiguration().setSqlSchema("PUBLIC")
    );
    const columns = param.columns.join(",");
    let sql = `DROP TABLE IF EXISTS ${param.table};`;
    (await cache.query(new SqlFieldsQuery(sql))).getAll();
    sql = `CREATE TABLE IF NOT EXISTS\n${param.table}\n( id INTEGER PRIMARY KEY, ${columns});`;
    (await cache.query(new SqlFieldsQuery(sql))).getAll();
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  } finally {
    igniteClient.disconnect();
  }
}
async function find(query) {
  const igniteClientConfiguration = new IgniteClientConfiguration(
    development.host
  )
    .setUserName(development.username)
    .setPassword(development.password)
    .setConnectionOptions(true);
  // Connect to the cluster.
  const igniteClient = new IgniteClient();
  try {
    await igniteClient.connect(igniteClientConfiguration);
    const cache = await igniteClient.getOrCreateCache(
      "PUBLIC",
      new CacheConfiguration().setSqlSchema("PUBLIC")
    );
    const result = [];
    const sqlFieldsCursor = await cache.query(
      new SqlFieldsQuery(query).setPageSize(200)
    );
    do {
      const e = await sqlFieldsCursor.getValue();
      if (e !== null) {
        result.push(e);
      }
    } while (sqlFieldsCursor.hasMore());
    return result;
  } catch (err) {
    console.log(err.message);
    return [];
  } finally {
    igniteClient.disconnect();
  }
}
module.exports = { insert, createTable, find };
