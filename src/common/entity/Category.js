const IgniteBase = require("../ignite/igniteBase");
/**
 * name : Tên ứng với trong db, không set thì lấy mặc định theo biến đặt.
 * label : tên xuất ra mong muốn, không set thì lấy mặc định theo biến đặt.
 * type : kiểu dữ liệu của SQL.
 */
module.exports = class Category extends IgniteBase {
  constructor(
    name = "category", // tên của table trong db
    // set up sẵn id, createAt.
    _sql = {
      name: { type: "VARCHAR(200)" },
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
