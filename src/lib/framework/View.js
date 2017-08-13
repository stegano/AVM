var utils = require("../utils");

/**
 * 컴포넌트를 구조적으로 사용하고 관리하기 위한 뷰 객체
 * @constructor
 * @example
 *
 * // 뷰 객체 구현(확장)
 * var Component = View.extend({
 *   // `View.execute` 함수가 실행되면 최초로 실행되는 함수
 *   initialize: function() { ... },
 *   // 그외 원하는대로 정의하여 사용!
 *   render: function() { ... },
 *   values: { a: 1, b: 2, c: 3, ... }
 * });
 *
 * // 구현된 뷰 객체 실행
 * Component.exectue({
 *   title : "View Component",
 *   defaultValue: "1234"
 *   ...
 * });
 * */
var View = function (options) {
  var _options = options || {};
  /**
   * 현재 구현된 뷰를 확장하여 반환하는 객체
   * @param {Object} extOptions 뷰 구현 정보
   * @return {Object} View
   * */
  this.extend = function (extOptions) {
    var _extOptions = utils.extend(extOptions, _options) || {};
    return View.prototype.extend(_extOptions);
  };
  /**
   * 뷰 컴포넌트 실행 함수
   * @param {Object} [properties] `initialize`함수에 전달될 값
   * @return {Object} options
   * */
  this.execute = function (properties) {
    if ("initialize" in _options && typeof _options.initialize === "function") {
      _options.initialize.call(_options, properties);
    }
    return _options;
  };
};
/**
 * 뷰를 확장하여 반환하는 객체
 * @param {Object} extOptions 뷰 구현 정보
 * @return {Object} View
 * */
View.prototype.extend = function (extOptions) {
  var _extOptions = extOptions || {};
  return new View(_extOptions);
};

View.extend = View.prototype.extend;

module.exports = View;
