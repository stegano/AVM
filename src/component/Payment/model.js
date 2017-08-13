var Model = require("../../lib/framework/Model");
/**
 * 사용자 결제정보를 보여주는 뷰의 모델
 * @class
 * @constructor
 * @extends Model
 * */
var PaymentModel = new Model({
  /**
   * 소유 금액
   * @memberOf PaymentModel
   * @type {Number}
   * */
  myAccount: 10000,
  /**
   * 자판기에 넣은 금액
   * @memberOf PaymentModel
   * @type {Number}
   * */
  deposit: 0,
  /**
   * 자판기에 넣을 수 있는 금액
   * @memberOf DisplayModel
   * @type {Number[]}
   * */
  chargeAmountItems: [
    50,
    100,
    500,
    1000
  ]
});

module.exports = PaymentModel;
