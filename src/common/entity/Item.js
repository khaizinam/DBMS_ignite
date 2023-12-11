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
    await this.insert([
      {
        id: "1",
        data: [
          "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          45000,
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          "Áo",
          "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          120,
          3.9,
        ],
      },
      {
        id: "2",
        data: [
          "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          45000,
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          "Áo",
          "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          120,
          3.9,
        ],
      },
    ]);
  }
};
