var utils = require("../utils");

/**
 * 컴포넌트를 구조적으로 사용하고 관리하기 위한 뷰 객체
 * @constructor
 * */
var View = function (options) {
  var _options = options || {};
  /**
   * 현재 구현된 뷰를 확장하여 리턴하는 객체
   * */
  this.extend = function (extOptions) {
    var _extOptions = utils.extend(extOptions, _options);
    return View.prototype.extend(_extOptions);
  };
  /**
   * 뷰 컴포넌트 실행 함수
   * */
  this.execute = function (properties) {
    if ("initialize" in _options && typeof _options.initialize === "function") {
      _options.initialize.call(_options, properties);
    }
    return _options;
  };
};

/**
 * 현재 구현된 뷰를 확장하여 리턴하는 객체
 * */
View.prototype.extend = function (extOptions) {
  var _extOptions = extOptions || {};
  return new View(_extOptions);
};

View.extend = View.prototype.extend;

module.exports = View;
