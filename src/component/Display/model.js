var Model = require("../../lib/framework/Model");
/**
 * 판매 상품을 보여주는 뷰의 모델
 * @namespace DisplayModel
 * */
var DisplayModel = new Model({
  items: [],
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
