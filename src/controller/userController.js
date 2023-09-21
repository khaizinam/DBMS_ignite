const { STATUS_CODE } = require("../constants/item.constants");
const { ResponseModel } = require("../model/commonResponse");
// const { formatString } = require("../feature/formatString");
// const db = require("../db/models/index");
// const User = db.User;
const User = require("../common/entity/User");
/*---------------------------------*/

const user = new User();

exports.getUsers = async (req, res, next) => {
  const data = await user.findAll({});
  res.status(STATUS_CODE.OK).send({ users: data });
};

exports.create = async ({ email, password, full_name }) => {
  await user.insert([[email, password, full_name, 0]]);
  const found = await user.findOne({
    where: [`email='${email}'`, `password='${password}'`],
  });
  return found;
};

exports.setToken = async ({ email, password, currentLog }) => {
  user.update({
    where: [`email='${email}'`],
    values: [`current_log='${currentLog}'`],
  });
  return true;
};
exports.isExits = async ({ email }) => {
  const num = await user.isExist({
    where: [`email='${email}'`],
  });
  return num;
};

exports.getOne = async (query) => {
  const found = await user.findOne({
    where: query,
  });
  console.log(found);
  return found;
};
