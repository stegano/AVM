var View = require("../lib/framework/View");
var model = require("./model");
/**
 * 판매 상품을 보여주는 뷰 컴포넌트
 * */
var Display = View.extends({
  rootElId: "#display",
  model: model,
  initialize: function () {
    this.model.on("change:items", function (items) {
      console.log("set Items!!", items);
    });

    /**
     * 기본 설정으로 아이템 생성
     * */
    this.model.set({
      items: this.genItems()
    });
  },
  /**
   * @param {String[]} itemNames 아이템 이름
   * @param {Number} minPrice 최소 가격
   * @param {Number} maxPrice 최대 가격
   * @param {Number} minCount 최소 갯수
   * @param {Number} maxCount 최대 갯수
   * @return {Object[]} items 랜덤 순서, 랜덤 가격, 랜덤 갯수로 생성된 아이템 배열
   * */
  genItems: function (itemNames, minPrice, maxPrice, minCount, maxCount) {
    var _itemNames = itemNames instanceof Array ? itemNames : [
      "펩시",
      "V10",
      "거름",
      "맹물",
      "환타",
      "식혜",
      "국물",
      "박카스"
    ];
    var _minPrice = Number(minPrice) || 100;
    var _maxPrice = Number(maxPrice) || 800;
    var _minCount = Number(minCount) || 1;
    var _maxCount = Number(maxCount) || 3;
    var ret = [];
    for (var name, price, count, len = _itemNames.length, i = 0; i < len; i++) {
      name = _itemNames.splice(this.genRandomValue(0, _itemNames.length - 1), 1)[0];
      price = Math.round(this.genRandomValue(_minPrice, _maxPrice) / 100) * 100;
      count = this.genRandomValue(_minCount, _maxCount);
      ret.push({
        name: name,
        price: price,
        count: count
      });
    }
    return ret;
  },
  /**
   * 랜덤 숫자 생성
   * @param {number} min 최소 값
   * @param {number} max 최대 값
   * @return {number} `min ~ max` 사이의 정수
   * */
  genRandomValue: function (min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
  },
  render: function () {

  }
});

module.exports = Display;
