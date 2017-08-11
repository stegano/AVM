/**
 * 컴포넌트를 구조적으로 사용하고 관리하기 위한 뷰 객체
 * @constructor
 * */
var View = function (options, property) {
  var _options = options || {};
  if ("initialize" in _options && typeof _options.initialize === "function") {
    options.initialize(property);
  }
  this.extends = function (options) {
    return new View(options);
  }
};

module.exports = View;
