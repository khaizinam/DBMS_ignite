const IgniteBase = require("../ignite/igniteBase");
const DataType = require("../ignite/dataType");
const dataJson = require("./data.json");
/**
 * name : Tên ứng với trong db, không set thì lấy mặc định theo biến đặt.
 * label : tên xuất ra mong muốn, không set thì lấy mặc định theo biến đặt.
 * type : kiểu dữ liệu của SQL.
 */
module.exports = class Products extends IgniteBase {
  constructor(
    name = "products",
    _sql = {
      title: { type: DataType.VARCHAR },
      price: { type: DataType.DOUBLE },
      description: {
        type: DataType.VARCHAR,
      },
      category: {
        type: DataType.VARCHAR,
      },

      image: { type: DataType.VARCHAR },
      count: { type: DataType.INT },
      rating: { type: DataType.DOUBLE },
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
    await this.insert(
      dataJson.map((item) => ({
        id: item.id,
        data: [
          item.title,
          item.price,
          item.description,
          item.category,
          item.image,
          item.rating.count,
          item.rating.rate,
        ],
      }))
    );
  }
};
