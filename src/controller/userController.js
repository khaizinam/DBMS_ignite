const { STATUS_CODE } = require("../constants/item.constants");
const { ResponseModel } = require("../model/commonResponse");
// const { formatString } = require("../feature/formatString");
// const db = require("../db/models/index");
// const User = db.User;
const User = require("../common/entity/UserEntity");
/*---------------------------------*/

const user = new User();

// exports.getUsers = async (req, res, next) => {
//   const data = await User.findAll({});
//   let users = [];
//   data.forEach((element) => {
//     //delete element.dataValues["password"];
//     users.push(element.dataValues);
//   });
//   const response = new ResponseModel({ contents: users });
//   res.status(STATUS_CODE.OK).send(response);
// };

// exports.create = async ({ email, password, full_name }) => {
//   const create = await User.create({
//     email,
//     password,
//     full_name,
//     current_log: 0,
//     roles: JSON.stringify(["USER"]),
//   });
//   const user = await find({ email, password });
//   return user;
// };

exports.setToken = async ({ email, password, currentLog }) => {
  user.update({
    where: [`email='${email}'`],
    values: [`current_log='${currentLog}'`],
  });
  return true;
};
// exports.isExits = async ({ email }) => {
//   const num = await User.count({
//     where: {
//       email,
//     },
//   });
//   return num;
// };

// const find = async (query) => {
//   const found = await User.findOne({
//     where: { ...query },
//   });
//   if (!found) return null;
//   const user = found?.dataValues;
//   delete user["password"];
//   return user;
// };

exports.getOne = async (query) => {
  const found = await user.findOne({
    where: query,
  });
  console.log(found);
  return found;
};
