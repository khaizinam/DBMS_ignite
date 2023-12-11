class ResponseModel {
  constructor(data) {
    this.error = false;
    this.data = data;
  }
  static isError(err) {
    this.error = err;
  }
}
class ErrorMessage {
  constructor(code, params) {
    console.log(code, params);
    this.error = true;
    if (params !== undefined) {
      this.data = {
        message: params,
      };
    } else {
      this.data = {
        message: code,
      };
    }
  }
}
module.exports = { ResponseModel, ErrorMessage };
