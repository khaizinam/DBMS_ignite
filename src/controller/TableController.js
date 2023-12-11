//------------------------------
const DB = require("../common/entity/index");

const user = DB.entities["user"];
const products = DB.entities["products"];
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
exports.createProduct = async (req, res, next) => {
  const { title, price, description, category, image, count, rating } =
    req.body;
  const rs = await products.insert([
    { data: [title, price, description, category, image, count, rating] },
  ]);
  if (rs) res.status(200).send("sucess");
  else res.status(500).send("fail");
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
