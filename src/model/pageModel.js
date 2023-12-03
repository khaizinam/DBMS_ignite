module.exports = class PageModel {
  constructor(data) {
    this.pageLimit = 500;
    this.data = data;
    this.currentPage = 1;
    this.totalPage = 1;
  }
};
