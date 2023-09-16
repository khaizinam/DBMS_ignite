const IgniteBase = require("../ignite/igniteBase");
/**
 * name : Tên ứng với trong db, không set thì lấy mặc định theo biến đặt.
 * label : tên xuất ra mong muốn, không set thì lấy mặc định theo biến đặt.
 * type : kiểu dữ liệu của SQL.
 */
module.exports = class User extends IgniteBase {
  constructor(
    name = "users", // tên của table trong db
    // set up sẵn id, createAt.
    _sql = {
      // tên các cột trong db
      fullName: { name: "full_name", type: "VARCHAR(200)" },
      password: {},
      email: {},
      phoneNumber: {
        name: "phone_number",
        type: "VARCHAR(13)",
      },
      currentLog: { name: "current_log", type: "DOUBLE" },
    }
  ) {
    // call constructor từ IgniteBase
    super(name, _sql);
  }
  /* hàm có sẵn
  createTable
  insert
  update
  findOne
  findOneById
  findAll
  delete
  deleteById
  */
  // Some function here------------------------
};
