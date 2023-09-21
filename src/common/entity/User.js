const IgniteBase = require("../ignite/igniteBase");
const DataType = require("../ignite/dataType");
module.exports = class User extends IgniteBase {
  /**
   *
   * @param name : Tên định danh table khởi tạo.
   * @param _sql : khởi tạo các fields columns.
   * _sql : {
   *    name : <Tên columns trong db> : mặc định lấy tên khai báo.
   *    label : <Tên output ra ngoài> : mặc định lấy tên khai báo.
   *    type : <kiểu dữ liệu> : mặc định VARCHAR(225).
   *    size : <độ dài kiểu dữ liệu> : mặc định không set.
   *    parent : <thuộc table nào> : : mặc định table đang khởi tạo.
   * }
   */
  constructor(
    name = "user", // tên của table trong db
    // tên các cột trong db
    _sql = {
      fullName: { name: "full_name", type: DataType.VARCHAR, size: 200 },
      password: { type: DataType.VARCHAR },
      email: { type: DataType.VARCHAR, size: 100 },
      phoneNumber: {
        name: "phone_number",
        type: DataType.VARCHAR,
        size: 14,
      },
      currentLog: { name: "current_log", type: DataType.DOUBLE },
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
  async init() {
    await this.insert([
      {
        id: "1",
        data: [
          "Nguyen Huu Khai",
          "123",
          "khaizinam@gmail.com",
          "0846141788",
          0,
        ],
      },
      {
        id: "2",
        data: ["Nguyễn Văn A", "123", "admin@gmail.com", "0846141788", 0],
      },
    ]);
  }
};
