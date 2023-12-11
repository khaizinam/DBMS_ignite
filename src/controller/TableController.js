const { MESSAGE_CONST } = require("../constants/message.constants");
const { STATUS_CODE } = require("../constants/item.constants");
//------------------------------
const DB = require("../common/entity/index");
const PageModel = require("../model/pageModel");
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
    res.status(STATUS_CODE.OK).send({ msg });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_ERROR).send({ msg: error });
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
    res.status(STATUS_CODE.NOT_FOUND).send({ message: "No data in db!" });
  } else {
    res.status(STATUS_CODE.OK).send(new PageModel(result));
  }
};

exports.getProducts = async (req, res, next) => {
  const result = await products.findAll({});
  if (!result) {
    res.status(STATUS_CODE.NOT_FOUND).send([]);
  } else {
    res.status(STATUS_CODE.OK).send(result);
  }
};
exports.getOneProduct = async (req, res, next) => {
  const { id } = req.body;

  const result = await products.findOne({ where: [`id='${id}'`] });
  if (!result) {
    res.status(STATUS_CODE.NOT_FOUND).send([]);
  } else {
    res.status(STATUS_CODE.OK).send(result);
  }
};
exports.getProductByCategory = async (req, res, next) => {
  const { category } = req.body;

  const result = await products.findAll({ where: [`category='${category}'`] });
  if (!result) {
    res.status(STATUS_CODE.NOT_FOUND).send([]);
  } else {
    res.status(STATUS_CODE.OK).send(result);
  }
};
