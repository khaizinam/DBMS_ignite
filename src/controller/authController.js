// const jwt = require("jsonwebtoken");
// const userController = require("../controller/userController");
// const { ResponseModel, ErrorMessage } = require("../model/commonResponse");
// const { MESSAGE_CONST } = require("../constants/message.constants");
// const { STATUS_CODE } = require("../constants/item.constants");
// /* end of import */

// /*
//  * create new token
//  * @param payload : object
//  */
// const signToken = async (payload) => {
//   const token = await jwt.sign(
//     { id: payload.id, email: payload.email, currentLog: payload.currentLog },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     }
//   );
//   return token;
// };

// /*
//  * create token and send to client
//  * @param payload : object
//  */
// const createSendToken = async (payload, res) => {
//   try {
//     const token = await signToken(payload);
//     res.status(200).json(
//       new ResponseModel({
//         token,
//         ...payload,
//         currentLog: new Date(payload.currentLog),
//       })
//     );
//   } catch (error) {
//     res.status(404).json({ message: "Lỗi khi truyền param token" });
//   }
// };

// /*
//  * SIGN UP
//  */
// exports.signup = async (req, res, next) => {
//   const { email, password, full_name } = req.body;
//   if (!email || !password || !full_name) {
//     return res
//       .status(STATUS_CODE.BAD_REQUEST)
//       .send(
//         new ErrorMessage(MESSAGE_CONST.REQUIRED_VALUE.code, [
//           "Email/ PassWord/ Full name",
//         ])
//       );
//   }
//   const isExits = await userController.isExits({ email });
//   if (isExits) {
//     return res
//       .status(400)
//       .send(new ErrorMessage(MESSAGE_CONST.IS_EXISTED.code, ["Email", email]));
//   } else {
//     try {
//       const newUser = await userController.create({
//         email,
//         password,
//         fullName,
//       });
//       return res.status(200).send("success");
//     } catch (error) {
//       return res.status(500).send({ message: "Server error!" });
//     }
//   }
// };

// /*
//  * LOG IN
//  *
//  */
// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;
//   // 1) Check if email and password exist
//   if (!email || !password) {
//     return res
//       .status(STATUS_CODE.BAD_REQUEST)
//       .send(
//         new ErrorMessage(MESSAGE_CONST.REQUIRED_VALUE.code, ["Email/ PassWord"])
//       );
//   }
//   try {
//     const user = await userController.getOne([
//       `email='${email}'`,
//       `password='${password}'`,
//     ]);
//     if (!user) {
//       return res
//         .status(STATUS_CODE.NOT_FOUND)
//         .send(new ErrorMessage(MESSAGE_CONST.NOT_FOUND.code, ["tài khoản"]));
//     }
//     const currentLog = await new Date().getTime();
//     delete user["password"];
//     await userController.setToken({ email, password, currentLog });
//     createSendToken({ ...user, currentLog }, res);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "Server error" });
//   }
// };

// /*
//  * LOG OUT
//  *
//  */
// exports.logout = (req, res) => {
//   // res.cookie("jwt", "loggedout", {
//   //   expires: new Date(Date.now() + 10 * 1000),
//   //   httpOnly: true,
//   // });
//   res.status(STATUS_CODE.OK).send("success");
// };

// /*
//  * Protect gateway to other api
//  *
//  */
// exports.protect = async (req, res, next) => {
//   // 1) Getting token and check of it's there
//   let token = "";
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) {
//     return res
//       .status(STATUS_CODE.TOKEN_ERR)
//       .send(new ErrorMessage(MESSAGE_CONST.NOT_FOUND.code, ["token"]));
//   } else {
//     try {
//       // 2) Verification token
//       const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//       const userToken = decoded;
//       console.log("decode : ", decoded);
//       if (!userToken) {
//         return res
//           .status(STATUS_CODE.TOKEN_ERR)
//           .send(
//             new ErrorMessage(MESSAGE_CONST.NOT_FOUND.code, ["payload token"])
//           );
//       } else {
//         // 3) Check if user still exists
//         const currentUser = await userController.getOne([
//           `id='${userToken.id}'`,
//           `email='${userToken.email}'`,
//         ]);

//         if (!currentUser) {
//           // not found user in db
//           return res
//             .status(STATUS_CODE.TOKEN_ERR)
//             .send(
//               new ErrorMessage(MESSAGE_CONST.NOT_PERMISSION.code, [
//                 "truy cập api",
//               ])
//             );
//         } else {
//           if (
//             parseInt(currentUser.currentLog) !== parseInt(userToken.currentLog)
//           ) {
//             // old token
//             return res
//               .status(STATUS_CODE.TOKEN_ERR)
//               .send(new ErrorMessage(MESSAGE_CONST.EXPIRED.code, ["API"]));
//           } else return next();
//         }
//       }
//     } catch (error) {
//       console.log("err decode :", error);
//       return res
//         .status(STATUS_CODE.TOKEN_ERR)
//         .send(new ErrorMessage(MESSAGE_CONST.IN_VALID.code, ["token"]));
//     }
//   }
// };

// /*
//  * check token
//  *
//  */
// exports.initPermission = async (req, res, next) => {
//   // 1) Getting token and check of it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) {
//     return res
//       .status(STATUS_CODE.TOKEN_ERR)
//       .send(new ErrorMessage(MESSAGE_CONST.NOT_FOUND.code, ["token"]));
//   } else {
//     try {
//       // 2) Verification token
//       const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//       const userToken = decoded;
//       console.log("decode : ", decoded);
//       if (!userToken) {
//         return res
//           .status(STATUS_CODE.TOKEN_ERR)
//           .send(
//             new ErrorMessage(MESSAGE_CONST.NOT_FOUND.code, ["payload token"])
//           );
//       } else {
//         // 3) Check if user still exists
//         const currentUser = await userController.getOne([
//           `id='${userToken.id}'`,
//           `email='${userToken.email}'`,
//         ]);

//         if (!currentUser) {
//           // not found user in db
//           return res
//             .status(STATUS_CODE.TOKEN_ERR)
//             .send(
//               new ErrorMessage(MESSAGE_CONST.NOT_PERMISSION.code, [
//                 "truy cập api",
//               ])
//             );
//         } else {
//           if (
//             parseInt(currentUser.currentLog) !== parseInt(userToken.currentLog)
//           ) {
//             // old token
//             return res
//               .status(STATUS_CODE.TOKEN_ERR)
//               .send(new ErrorMessage(MESSAGE_CONST.EXPIRED.code, ["API"]));
//           } else {
//             delete currentUser?.password;
//             delete currentUser?.createAt;
//             return res.status(200).send(new ResponseModel({ ...currentUser }));
//           }
//         }
//       }
//     } catch (error) {
//       console.log("err decode :", error);
//       return res
//         .status(STATUS_CODE.TOKEN_ERR)
//         .send(new ErrorMessage(MESSAGE_CONST.IN_VALID.code, ["Token"]));
//     }
//   }
// };
// /*
//  * check role to use this api
//  *
//  */
// exports.restrictTo =
//   (...roles) =>
//   (req, res, next) => {
//     // roles ['ADMIN', 'USER']. role='USER'
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(STATUS_CODE.AUTH_ERR)
//         .send(
//           new ErrorMessage(MESSAGE_CONST.NOT_PERMISSION.code, ["truy cập api"])
//         );
//     }
//     next();
//   };
