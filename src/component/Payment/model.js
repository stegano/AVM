var Model = require("../../lib/framework/Model");
/**
 * 판매 상품을 보여주는 뷰의 모델
 * @namespace PaymentModel
 * */
var PaymentModel = new Model({
  myAccount: 0,
  deposit: 0
});
module.exports = PaymentModel;
