const IgniteBase = require("../ignite/igniteBase");
const DataType = require("../ignite/dataType");
/**
 * title : lịch sử mua hàng.
 */
module.exports = class BuyItem extends IgniteBase {
  constructor(
    name = "buy_item",
    _sql = {
      itemId: {
        name: "item_id",
        label: "itemId",
        type: DataType.VARCHAR,
      },
      cartId: { name: "cart_id", label: "cartId", type: DataType.VARCHAR },
      price: { type: DataType.DOUBLE },
      qty: { type: DataType.INT },
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
        data: ["1.0", "1", 22, 2],
      },
    ]);
  }
};
