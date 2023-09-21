const IgniteBase = require("../ignite/igniteBase");
const DataType = require("../ignite/dataType");
/**
 * name : Tên ứng với trong db, không set thì lấy mặc định theo biến đặt.
 * label : tên xuất ra mong muốn, không set thì lấy mặc định theo biến đặt.
 * type : kiểu dữ liệu của SQL.
 */
module.exports = class Products extends IgniteBase {
  constructor(
    name = "products",
    _sql = {
      name: { type: DataType.VARCHAR },
      categoryId: {
        name: "category_id",
        label: "categoryId",
        type: DataType.VARCHAR,
      },
      cost: { type: DataType.DOUBLE },
      sale: {
        type: DataType.DOUBLE,
      },
      description: { type: DataType.VARCHAR },
      image: { type: DataType.VARCHAR },
      amounts: { type: DataType.VARCHAR },
      rating: { type: DataType.INT },
      shortDescription: {
        name: "short_description",
        label: "shortDescription",
        type: DataType.VARCHAR,
      },
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
