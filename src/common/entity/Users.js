module.exports = class Users {
  constructor(uid = "0", fullName = null, email = null, currentLog = null) {
    this.uid = uid;
    this.fullName = fullName;
    this.email = email;
    this.currentLog = currentLog;
  }
};
