var Model = require("../../lib/framework/Model");
/**
 * 판매 상품을 보여주는 뷰의 모델
 * @namespace PaymentModel
 * */
var PaymentModel = new Model({
  myAccount: 10000,
  deposit: 0,
  machineState: {
    billCount: 0,
    maxAmount: 3000
  },
  dataTransfer: {}
});
module.exports = PaymentModel;
