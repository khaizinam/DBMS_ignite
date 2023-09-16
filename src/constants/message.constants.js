const MESSAGE_CONST = {
  SERVER_ERROR: {
    code: "SERVER_ERROR",
    message: "Server lỗi!",
  },
  EXPIRED: { code: "EXPIRED", message: "{1} đã hết hạn!" },
  SUCCESS: {
    code: "SUCCESS",
    message: "{1} thành công!",
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Không tìm thấy {1}.",
  },
  IS_EXISTED: {
    code: "IS_EXISTED",
    message: "{1} '{2}' đã tồn tại.",
  },
  REQUIRED_VALUE: {
    code: "REQUIRED_VALUE",
    message: "{1} không được bỏ trống!",
  },
  NOT_PERMISSION: {
    code: "NOT_PERMISSION",
    message: "Không có quyền {1}!",
  },
  IN_VALID: {
    code: "IN_VALID",
    message: "{1} không đúng!",
  },
};
module.exports = { MESSAGE_CONST };
