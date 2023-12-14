//------------------------------
const DB = require("../common/entity/index");

const user = DB.entities["user"];
const products = DB.entities["products"];
const buy = DB.entities["buy"];
const buyItem = DB.entities["buy_item"];
/**
 * Title : create and init data base.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.createTable = async (req, res, next) => {
  try {
    const msg = await DB.init();
    res.status(200).send({ msg });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};
/**
 * Title: Get list of users in db
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getUserList = async (req, res, next) => {
  const result = await user.findAll({});
  if (!result) {
    res.status(404).send([]);
  } else {
    res.status(200).send(result);
  }
};

exports.getProducts = async (req, res, next) => {
  const result = await products.findAll({});
  if (!result) {
    res.status(404).send([]);
  } else {
    res.status(200).send(result);
  }
};

exports.updateProduct = async (req, res, next) => {
  const modal = req.body;
  console.log(modal);
  const result = await products.update({
    where: [`id='${modal.id}'`],
    values: [
      `title='${modal.title}'`,
      `description='${modal.description}'`,
      `image='${modal.image}'`,
      `category='${modal.category}'`,
      `price=${modal.price}`,
      `rating=${modal.rating}`,
      `count=${modal.count}`,
    ],
  });
  if (!result) {
    res.status(404).send(result);
  } else {
    res.status(200).send(result);
  }
};

exports.getProductsSearch = async (req, res, next) => {
  const searchModal = req.body;
  console.log(searchModal);
  //{ columns, where, orderBy, limit }
  const where = [];
  const orderBy =
    searchModal.order === "0"
      ? "ORDER BY create_at ASC"
      : "ORDER BY create_at DESC";
  if (searchModal.id !== "") where.push(`id LIKE '%${searchModal.id}%'`);
  if (searchModal.category !== "")
    where.push(`category='${searchModal.category}'`);
  if (searchModal.title !== "")
    where.push(`title LIKE '%${searchModal.title}%'`);

  const result = await products.findAll({ where: where, orderBy });
  if (!result) {
    res.status(404).send([]);
  } else {
    res.status(200).send(result);
  }
};
exports.createProduct = async (req, res, next) => {
  const modal = req.body;
  console.log(modal);
  const rs = await products.insert([
    {
      data: [
        modal.title,
        modal.price,
        modal.description,
        modal.category,
        modal.image,
        modal.count,
        modal.rating,
      ],
    },
  ]);
  if (rs) res.status(200).send(rs);
  else res.status(500).send(rs);
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  const rs = await products.delete({ where: [`id='${id}'`] });
  if (rs) res.status(200).send(rs);
  else res.status(500).send(rs);
};
exports.getOneProduct = async (req, res, next) => {
  const { id } = req.body;
  const result = await products.findOne({ where: [`id='${id}'`] });
  if (!result) {
    res.status(404).send([]);
  } else {
    res.status(200).send(result);
  }
};
exports.getProductByCategory = async (req, res, next) => {
  const { category } = req.body;

  const result = await products.findAll({ where: [`category='${category}'`] });
  if (!result) {
    res.status(404).send([]);
  } else {
    res.status(200).send(result);
  }
};
function getDateFormat() {
  const d = Date.now();
  return d; //
}
exports.createBuy = async (req, res, next) => {
  const modal = req.body;
  const userId = modal.userId;
  const products = modal.state;
  let price = 0;
  products.forEach((element) => {
    price += element.price * element.qty;
  });

  const timeBuy = getDateFormat();

  try {
    const cartId = await buy.insert([
      { data: [userId, price, timeBuy, "Chưa thanh toán"] },
    ]);
    if (!cartId) {
      res.status(500).send(false);
    } else {
      const insertItem = [];
      products.forEach((element) => {
        insertItem.push({
          data: [element.id, cartId, element.price, element.qty],
        });
      });
      const result = await buyItem.insert(insertItem);
      res.status(200).send(true);
    }
  } catch (error) {
    res.status(500).send(false);
  }
};
function dateFormat(day) {
  const d = new Date(day);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}`;
}
exports.searchBuyHistory = async (req, res, next) => {
  const searchModal = req.body;

  const query = `SELECT buy.id as id, user.full_name as user_name, buy.price as price, buy.timeBuy as timeBuy, buy.status as status,buy.create_at as create_at
  FROM buy
  INNER JOIN user ON buy.user_id=user.id
  ORDER BY buy.create_at ASC;`;

  const history = await buy.selectByQuery(query);

  const data = history.map((e) => ({
    id: e[0],
    username: e[1],
    price: e[2],
    timeBuy: dateFormat(e[3]),
    status: e[4],
  }));

  res.status(200).send(data);
};
