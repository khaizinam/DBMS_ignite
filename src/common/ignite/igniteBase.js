const IgniteClient = require("apache-ignite-client");
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;
const CacheConfiguration = IgniteClient.CacheConfiguration;
const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
const ObjectType = IgniteClient.ObjectType;
const ScanQuery = IgniteClient.ScanQuery;
const QueryField = IgniteClient.QueryField;
const CacheEntry = IgniteClient.CacheEntry;
const BinaryObject = IgniteClient.BinaryObject;
const QueryEntity = IgniteClient.QueryEntity;
const SqlQuery = IgniteClient.SqlQuery;
const ComplexObjectType = IgniteClient.ComplexObjectType;
//
const Users = require("../entity/Users");
const crypto = require("crypto");
const { development } = require("./config");
module.exports = class IgniteBase {
  constructor(name, _sql) {
    this._SCHEMA = "PUBLIC";
    this.ENDPOINT = development.endpoint;
    this._CACHE = development.cache;
    this._name = name;
  }

  async createTable() {
    const igniteClient = new IgniteClient(this.onStateChanged.bind(this));

    try {
      await igniteClient.connect(new IgniteClientConfiguration(this.ENDPOINT));
      //await igniteClient.destroyCache(this._CACHE);
      const cacheCfg = new CacheConfiguration().setQueryEntities(
        new QueryEntity()
          .setValueTypeName("Users")
          .setFields([
            new QueryField("uid", "java.lang.String"),
            new QueryField("fullName", "java.lang.String"),
            new QueryField("email", "java.lang.String"),
            new QueryField("currentLog", "java.lang.Double"),
          ])
      );
      const cache = (await igniteClient.getOrCreateCache(this._CACHE, cacheCfg))
        .setKeyType(ObjectType.PRIMITIVE_TYPE.STRING)
        .setValueType(
          new ComplexObjectType(new Users()).setFieldType(
            "uid",
            ObjectType.PRIMITIVE_TYPE.STRING
          )
        );
      // const persons = [
      //   ["abc123", "Nguyen Huu khải", "khaizinam@gmail.com", 1000],
      //   ["abc124", "Nguyen Huu khải", "khaizinam12@gmail.com", 1000],
      // ];

      // for (let data of persons) {
      //   let person = new Users(...data);
      //   await cache.put(person.uid, person);
      // }
      const sqlCursor = await cache.query(
        new SqlQuery("Users", "uid = ?").setArgs("abc124")
      );
      let person;
      do {
        person = (await sqlCursor.getValue()).getValue();
        console.log(person);
      } while (sqlCursor.hasMore());
      // const u = await cache.get("abc124");
      // console.log(u);
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      igniteClient.disconnect();
    }
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
