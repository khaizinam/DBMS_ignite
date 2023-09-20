const IgniteBase = require("../ignite/igniteBase");
/**
 * name : Tên ứng với trong db, không set thì lấy mặc định theo biến đặt.
 * label : tên xuất ra mong muốn, không set thì lấy mặc định theo biến đặt.
 * type : kiểu dữ liệu của SQL.
 */
module.exports = class Products extends IgniteBase {
  constructor(
    name = "products", // tên của table trong db
    // set up sẵn id, createAt.
    _sql = {
      // tên các cột trong db
      name: { type: "VARCHAR(200)" },
      categoryId: {
        name: "category_id",
        label: "categoryId",
        type: "VARCHAR(200)",
      },
      cost: { type: "DOUBLE" },
      sale: {
        type: "DOUBLE",
      },
      description: { type: "VARCHAR" },
      image: { type: "VARCHAR" },
      amounts: { type: "VARCHAR" },
      rating: { type: "INT" },
      shortDescription: {
        name: "short_description",
        label: "shortDescription",
        type: "VARCHAR",
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
