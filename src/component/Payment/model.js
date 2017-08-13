var Model = require("../../lib/framework/Model");
/**
 * 사용자 결제정보를 보여주는 뷰의 모델
 * @namespace PaymentModel
 * */
var PaymentModel = new Model({
  myAccount: 10000,
  deposit: 0,
  chargeAmountItems: [
    50,
    100,
    500,
    1000
  ]
});

module.exports = PaymentModel;
