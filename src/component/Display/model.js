var Model = require("../../lib/framework/Model");
/**
 * 판매 상품을 보여주는 뷰의 모델
 * @class
 * @constructor
 * @extends Model
 * */
var DisplayModel = new Model({
  /**
   * 화면에 보여질 아이템 목록
   * @memberOf DisplayModel
   * @type {Object[]}
   * */
  items: [],
  /**
   * 뷰에서 생성할 아이템 이름 목록
   * @memberOf DisplayModel
   * @type {String[]}
   * */
  itemNames: [
    "펩시",
    "V10",
    "거름",
    "맹물",
    "환타",
    "식혜",
    "국물",
    "박카스"
  ]
});

module.exports = DisplayModel;
