const IgniteBase = require("../ignite/igniteBase");
const DataType = require("../ignite/dataType");
/**
 * title : lịch sử mua hàng.
 */
module.exports = class Buy extends IgniteBase {
  constructor(
    name = "buy",
    _sql = {
      userId: {
        name: "user_id",
        label: "userId",
        type: DataType.VARCHAR,
      },
      price: { type: DataType.DOUBLE },
      timeBuy: { type: DataType.DOUBLE },
      status: { type: DataType.VARCHAR },
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
        data: ["1", 20, 1702564676080, "Đã thanh toán"],
      },
    ]);
  }
};
