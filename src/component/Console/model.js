var Model = require("../../lib/framework/Model");
/**
 * 로그 정보를 관리하는 모델
 * @namespace ConsoleModel
 * */
var ConsoleModel = new Model({
  /**
   * 로그
   * @memberOf ConsoleModel
   * @type {String}
   * */
  log: null
});

module.exports = ConsoleModel;
