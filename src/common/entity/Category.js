const IgniteBase = require("../ignite/igniteBase");
const DataType = require("../ignite/dataType");
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
      name: { type: DataType.VARCHAR, size: 225 },
      code: { type: DataType.VARCHAR, size: 100 },
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
  async init() {
    await this.insert([
      {
        id: "1",
        data: ["Nến cây", "nen-cay"],
      },
      {
        id: "2",
        data: ["Nến thờ", "nen-tho"],
      },
    ]);
  }
};
