const IgniteBase = require("../ignite/igniteBase");
module.exports = class User extends IgniteBase {
  /**
   *
   * @param name : Tên định danh table khởi tạo.
   * @param _sql : khởi tạo các fields columns.
   * _sql : {
   *    name : <Tên columns trong db> : mặc định lấy tên khai báo.
   *    label : <Tên output ra ngoài> : mặc định lấy tên khai báo.
   *    type : <kiểu dữ liệu> : mặc định VARCHAR(225).
   *    parent : <thuộc table nào> : : mặc định table đang khởi tạo.
   * }
   */
  constructor(
    name = "user", // tên của table trong db
    // tên các cột trong db
    _sql = {
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
    /* required super call */
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
