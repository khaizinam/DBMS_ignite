const IgniteBase = require("../ignite/igniteBase");
const DataType = require("../ignite/dataType");
/**
 * title : lịch sử mua hàng.
 */
module.exports = class Transaction extends IgniteBase {
  constructor(
    name = "transaction",
    _sql = {
      userId: {
        name: "user_id",
        label: "userId",
        type: DataType.VARCHAR,
      },
      itemId: {
        name: "item_id",
        label: "itemId",
        type: DataType.VARCHAR,
      },
      cart_id: { name: "cart_id", label: "cartId", type: DataType.VARCHAR },
      cost: { type: DataType.DOUBLE },
      sale: {
        type: DataType.DOUBLE,
      },
      timeBuy: { type: DataType.VARCHAR },
      purchaseDay: { type: DataType.VARCHAR },
      status: { type: DataType.VARCHAR },
      amounts: { type: DataType.INT },
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
        data: ["1", "1", "1", 45000, 0.2, "00000", "00000", "1", 5],
      },
      {
        id: "2",
        data: ["1", "2", "1", 65000, 0.15, "00000", "00000", "1", 1],
      },
    ]);
  }
};
