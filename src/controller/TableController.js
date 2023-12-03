const { MESSAGE_CONST } = require("../constants/message.constants");
const { STATUS_CODE } = require("../constants/item.constants");
//------------------------------
const DB = require("../common/entity/index");
const PageModel = require("../model/pageModel");
const user = DB.entities["user"];
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
