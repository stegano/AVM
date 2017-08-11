var View = require("../../lib/framework/View");
var Utils = require("../../lib/utils");
var model = require("./model");
/**
 * 판매 상품을 보여주는 뷰 컴포넌트
 * @namespace Payment
 * */
var Payment = new View({
  componentElementId: "payment",
  model: model,
  initialize: function () {
    var that = this;
    /**
     * 모델 이벤트 바인딩
     * */
    this.model.on("change:myAccount", function (account) {
      that.renderUpdateMyAccount(account);
    });
    this.model.on("change:deposit", function (deposit) {
      that.renderUpdateDeposit(deposit);
    });
    /**
     * 현재 가진 금액을 `10,000`으로 초기화
     * */
    this.model.set({
      myAccount: 10000
    });
  },
  /**
   * 현재 소유한 금액을 업데이트
   * @memberOf Payment
   * @param {Number} account
   * @return {Object} Payment
   * */
  renderUpdateMyAccount: function (account) {
    Utils.$("#myAccount > .amount")[0].innerText = Utils.comma(account);
    return this;
  },
  /**
   * 현재 넣은 금액을 업데이트
   * @memberOf Payment
   * @return {Object} Payment
   * */
  renderUpdateDeposit: function (account) {
    Utils.$("#deposit > .amount")[0].innerText = Utils.comma(account);
    return this;
  }
});

module.exports = Payment;
