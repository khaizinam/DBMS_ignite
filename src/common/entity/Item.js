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
      amounts: { type: DataType.INT },
      rating: { type: DataType.DOUBLE },
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
  async init() {
    await this.insert([
      {
        id: "1",
        data: [
          "Quần hoa",
          "1",
          45000,
          0.2,
          "des",
          "img",
          1000,
          5.0,
          "short des",
        ],
      },
      {
        id: "2",
        data: [
          "Quần thổ cẩm",
          "1",
          60000,
          0.15,
          "des",
          "img",
          275,
          4.5,
          "short des",
        ],
      },
    ]);
  }
};
