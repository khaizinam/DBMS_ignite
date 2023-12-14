// const IgniteClient = require("apache-ignite-client");
const IgniteClient = require("@gridgain/thin-client");
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;
const CacheConfiguration = IgniteClient.CacheConfiguration;
const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
const crypto = require("crypto");
const { development } = require("./config");
const username = "khaiznam";
const userPass = "khaizinam";
const url =
  "6adc1134-ca9e-4f4b-8b57-bd804428f060.nebula-shared-ap-southeast-1.nebula.gridgain.com:10800";
module.exports = class IgniteBase {
  constructor(name, _sql) {
    this._SCHEMA = "PUBLIC";
    this.ENDPOINT = development.endpoint;
    this._CACHE = development.cache;
    this._name = name;
    this.properties = ["id", "createAt"];
    this.id = {
      name: "id",
      label: "id",
      type: "VARCHAR PRIMARY KEY",
      parent: name,
      size: "",
    };
    this.createAt = {
      name: "create_at",
      label: "createAt",
      type: "DOUBLE",
      parent: name,
      size: "",
    };
    Object.keys(_sql).forEach((e) => {
      this.properties.push(e);
      this[e] = this.createProperty(_sql[e], e);
    });
  }
  /**
   * DELETE
   * @param {*} param where: [string]
   * @returns
   */
  async delete(param = { where }) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      const query = `DELETE FROM ${this._name} WHERE ${param.where.join(
        " AND "
      )};`;
      //
      (await cache.query(new SqlFieldsQuery(query))).getAll();
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * DELETE
   * @param {*} param
   * @returns
   */
  async deleteById(id) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      const query = `DELETE FROM ${this._name} WHERE id='${id}';`;
      //
      (await cache.query(new SqlFieldsQuery(query))).getAll();
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * UPDATE
   * @param {*} param
   * @returns
   */
  async update(param = { where, values }) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      const query = `UPDATE ${this._name}\nSET ${param.values.join(
        ","
      )}\nWHERE ${param.where.join(" AND ")};`;
      //
      (await cache.query(new SqlFieldsQuery(query))).getAll();
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * CREATE TABLE
   * @returns
   */
  async createTable() {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      const columns = await this.createColum();

      let sql = `DROP TABLE IF EXISTS ${this._name};`;
      (await cache.query(new SqlFieldsQuery(sql))).getAll();
      console.log(sql);
      sql = `CREATE TABLE IF NOT EXISTS ${this._name} (${columns});`;
      console.log(sql);
      const isCreate = await (
        await cache.query(new SqlFieldsQuery(sql))
      ).getAll();
      // console.log(`created table ${this._name} : ${isCreate[0][0] === 0}`);
      return {
        success: true,
        msg: `Created table name ${this._name} : ${
          isCreate[0][0] === 0 ? "success" : "fail"
        }`,
      };
    } catch (err) {
      console.log(err.message);
      return { success: false, msg: `create false\nerror: ${err.message}` };
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * SELECT
   * @param {*} param
   * @returns
   */
  async findAll(param = { columns, where, orderBy, limit }) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      const result = [];
      if (!param?.orderBy) param.orderBy = "ORDER BY create_at ASC";
      if (!param?.limit) param.limit = "LIMIT 500";
      const { query, columns } = await this.createSQLfind(param);
      console.log(query);
      const sqlFieldsCursor = await cache.query(
        new SqlFieldsQuery(query).setPageSize(200)
      );
      do {
        const e = await sqlFieldsCursor.getValue();
        if (e !== null) {
          // console.log(columns);
          const o = {};
          columns.forEach((key, index) => {
            o[key.label] = e[index];
          });
          result.push(o);
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
  /**
   * SELECT
   * @param {*} param
   * @returns
   */
  async findOne(param = { columns, where, limit }) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      let result;
      param.limit = "LIMIT 1";
      const { query, columns } = await this.createSQLfind(param);
      console.log(query);
      const sqlFieldsCursor = await cache.query(
        new SqlFieldsQuery(query).setPageSize(200)
      );
      const cursor = await sqlFieldsCursor.getValue();
      if (cursor !== null) {
        const o = {};
        columns.forEach((key, index) => {
          o[key.label] = cursor[index];
        });
        result = o;
      }
      return result;
    } catch (err) {
      console.log(err.message);
      return null;
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * SELECT
   * @param {*} param
   * @returns
   */
  async findOneById(id) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      let result;
      const param = {
        where: [`id='${id}'`],
        limit: "LIMIT 1",
      };
      const { query, columns } = await this.createSQLfind(param);
      const sqlFieldsCursor = await cache.query(
        new SqlFieldsQuery(query).setPageSize(200)
      );
      const cursor = await sqlFieldsCursor.getValue();
      if (e !== null) {
        const o = {};
        columns.forEach((key, index) => {
          o[key.label] = cursor[index];
        });
        result = o;
      }
      return result;
    } catch (err) {
      console.log(err.message);
      return null;
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * COUNT
   * @param {*} data
   * @returns
   */
  async count(param = { where }) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );

      let whereCondition = "";
      if (param?.where || param?.where.length > 0) {
        whereCondition = ` WHERE ${param.where.join(" AND ")}`;
      }
      const query = await cache.query(
        new SqlFieldsQuery(
          `SELECT COUNT(*) FROM ${this._name}${whereCondition};`
        )
      );
      const count = await query.getValue();
      return count[0];
    } catch (err) {
      console.log(err.message);
      return 0;
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * isExist
   * @param {*} data
   * @returns
   */
  async isExist(param = { where }) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      let whereCondition = "";
      if (param?.where || param?.where.length > 0) {
        whereCondition = ` WHERE ${param.where.join(" AND ")}`;
      }
      const query = await cache.query(
        new SqlFieldsQuery(
          `SELECT COUNT(*) FROM ${this._name}${whereCondition};`
        )
      );
      const count = await query.getValue();
      return count[0] > 0;
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * INSERT INTO
   * @param {*} data
   * @returns
   */
  async insert(data) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
      );
      //-----------------
      let columns = [];
      this.properties.forEach((prop) => {
        columns.push(this[prop].name);
      });
      columns = columns.join(", ");
      //-----------------
      const num_cols = this.properties.length;
      let value_columns = [];
      for (let i = 0; i < num_cols; i++) {
        value_columns.push("?");
      }
      value_columns = value_columns.join(", ");

      const sql = `INSERT INTO\n${this._name} (${columns})\nVALUES(${value_columns});`;
      // console.log(sql);
      const entityQuery = new SqlFieldsQuery(sql);

      for (let i = 0; i < data.length; i++) {
        let id;
        let val;
        if (!data[i]?.id) {
          do {
            id = crypto.randomUUID();
            val = await this.isExist({ where: [`id='${id}'`] });
          } while (val);
          const timeStamp = new Date().getTime();
          (
            await cache.query(
              entityQuery.setArgs(id, timeStamp, ...data[i].data)
            )
          ).getAll();
          console.log(
            `insert into ${this._name}: ${JSON.stringify({
              id,
              timeStamp,
              ...data[i].data,
            })}`
          );
        } else {
          id = data[i].id; // get id from data
          val = await this.isExist({ where: [`id='${id}'`] }); // check exits id in database
          if (!val) {
            // save if not exits
            const timeStamp = new Date().getTime(); // get new time
            (
              await cache.query(
                entityQuery.setArgs(id, timeStamp, ...data[i].data)
              )
            ).getAll();
            console.log(
              `insert into ${this._name}: ${JSON.stringify({
                id: id,
                timeStamp: timeStamp,
                data: data[i].data,
              })}`
            );
          }
        }
      }
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      igniteClient.disconnect();
    }
  }
  /**
   * NATIVE SELECT QUERY
   * @param {*} query
   * @returns
   */
  async selectByQuery(query) {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));
    const igniteClientConfiguration = new IgniteClientConfiguration(url)
      .setUserName(username)
      .setUserName(userPass)
      .setConnectionOptions(true);
    try {
      // await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      await igniteClient.connect(igniteClientConfiguration);
      const cache = await igniteClient.getOrCreateCache(
        this._CACHE,
        new CacheConfiguration().setSqlSchema(this._SCHEMA)
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

  /* --------------------------------FUNCTION-----------------------------------*/
  createProperty(prop, label) {
    return {
      name: prop?.name ? prop.name : label,
      label: prop?.label ? prop.label : label,
      type: prop?.type ? prop.type : "VARCHAR",
      size: prop?.size ? prop.size : "",
      parent: this._name,
    };
  }
  createColum() {
    const cols = [];
    this.properties.forEach((prop) => {
      const size = this[prop].size === "" ? "" : `(${this[prop].size})`;
      cols.push(`${this[prop].name} ${this[prop].type}${size}`);
    });
    return cols.join(", ");
  }

  getProps() {
    const props = [];
    this.properties.forEach((prop) => {
      props.push(this[prop]);
    });
    return props;
  }
  printProps() {
    this.properties.forEach((prop) => {
      console.log(`${prop} :`, this[prop]);
    });
  }

  getColNM(col) {
    return col.name;
  }

  joinColumn(cols) {
    if (Array.isArray(cols)) {
      const arr = [];
      cols.forEach((item) => {
        arr.push(`${item.parent}.${item.name} AS ${item.label}`);
      });
      return arr.join(", ");
    }
    return "*";
  }

  getQuery(where) {
    // config show where {col , op , param }
    if (where === undefined) return "";
    if (where.length > 0) {
      let index = 1;
      const arr = [];
      where.forEach((item) => {
        arr.push(`${item}`);
      });
      return `WHERE ${arr.join(" AND ")}`;
    }
    return "";
  }
  async init() {}
  /**
   *
   * @param {*} param { columns, where, orderBy, limit }
   * columns array [ ] {name : string, label : string , parent: string}
   * @returns
   */
  createSQLfind(param = { columns, where, orderBy, limit }) {
    let columns;
    if (!param?.columns) {
      columns = this.getProps();
    } else {
      columns = param.columns;
    }
    const cols = this.joinColumn(columns);
    let where;
    if (!param?.where) {
      where = "";
    } else {
      where = this.getQuery(param?.where);
    }
    let orderBy;
    if (!param?.orderBy) {
      orderBy = "";
    } else {
      orderBy = `\n${param?.orderBy}`;
    }
    let limit;
    if (!param?.limit) {
      limit = "";
    } else {
      limit = `\n${param?.limit}`;
    }
    const query = `SELECT ${cols}
    FROM ${this._name} AS ${this._name}
    ${where}${orderBy}${limit};`;
    return { query, columns };
  }

  onStateChanged(state, reason) {
    if (state === IgniteClient.STATE.CONNECTED) {
    } else if (state === IgniteClient.STATE.DISCONNECTED) {
      if (reason) {
        console.log(reason);
      }
    }
  }
};
