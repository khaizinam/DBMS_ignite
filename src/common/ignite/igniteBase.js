const IgniteClient = require("@gridgain/thin-client");
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;
const CacheConfiguration = IgniteClient.CacheConfiguration;
const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
const { development } = require("./config");

class IgniteBase {
  constructor(name, _sql) {
    this._name = name;
    this.properties = ["id"];
    this.id = { name: "id", type: "VARCHAR" };
    Object.keys(_sql).forEach((e) => {
      this.properties.push(e);
      this[e] = this.createProperty(_sql[e], e);
    });
    //this.printProps();
  }

  /*
   * create property from input object
   * @param prop : { any : any }
   * @param label : string
   */
  createProperty(prop, label) {
    return {
      name: prop?.name ? prop.name : label,
      type: prop?.type ? prop.type : "VARCHAR",
    };
  }

  /*
   * get all properties of this entity
   */
  getProps() {
    const props = [];
    this.properties.forEach((prop) => {
      props.push(this[prop]);
    });
    return props;
  }
  /*
   * print all properties of this entity
   */
  printProps() {
    this.properties.forEach((prop) => {
      console.log(`${prop} :`, this[prop]);
    });
  }

  /*
   * return columns of table
   * parse to 'name' AS 'label'
   * @param cols : string | { name : string , label : string | null }[]
   */
  getColNM(col) {
    return col.name;
  }

  /*
   * return columns of table
   * @param cols : string | {name : string , label : string }[]
   */
  joinColumn(cols) {
    if (Array.isArray(cols)) {
      const arr = [];
      cols.forEach((item) => {
        arr.push(item.name);
      });
      return arr.join(", ");
    }
    return "*";
  }

  /*
   * return query
   * @param conditions : [] | {col : string , op:string , param:string = null}[]
   */
  getQuery(conditions) {
    // config show CONDITIONs {col , op , param }
    if (conditions.length > 0) {
      let index = 1;
      const arr = [];
      conditions.forEach((item) => {
        arr.push(`${item.col}${item.op}'${item.param}'`);
      });
      return `WHERE ${arr.join(" AND ")}`;
    }
    return "";
  }

  /*
   * SELECT single table
   * @param tableCols : string | {name : string , label : string }
   * @param tableNM : string
   * @param conditions : { col: string , op : string =, <, >, <=, >=,, param : string = null } []
   */
  select(param = { columns, conditions }) {
    let cols = this.joinColumn(param.columns);
    if (!param?.columns) {
      cols = this.joinColumn(this.getProps());
    }
    const cond = this.getQuery(param.conditions);

    const query = `SELECT ${cols}\nFROM ${this._name} AS ${this._name}\n${cond} `;
    return query;
  }

  equal(o1, o2) {
    return { col: o1.name, op: "=", param: o2 };
  }
}

const b = new IgniteBase("user", {
  full_name: { type: "VARCHAR" },
  email: {},
  password: {},
});
console.log(b.select({ conditions: [] }));
