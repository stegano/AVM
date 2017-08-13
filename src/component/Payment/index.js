var View = require("../../lib/framework/View");
var Utils = require("../../lib/utils");
var model = require("./model");
var ConsoleModel = require("../Console/model");
/**
 * 결제 관련을 보여주는 뷰 컴포넌트
 * @namespace Payment
 * */
var Payment = View.extend({
  componentElementId: "payment",
  model: model,
  initialize: function () {
    var that = this;
    /**
     * 뷰에서 사용되는 아이템 템플릿
     * @memberOf Payment
     * @member {Function} replaceTemplateData
     * */
    this.itemTemplate = Utils.template(Utils.$("#PaymentWallerItemTemplate").innerHTML);
    /**
     * 자판기의 상태
     * @memberOf Payment
     * @member {Object} _machineState
     * */
    this._machineState = {
      billCount: 0,
      maxAmount: 3000,
      dataTransfer: {
        amount: 0
      }
    };
    /**
     * 모델 이벤트 바인딩
     * */
    this.model.on("change:myAccount", function (account) {
      that.renderUpdateMyAccount(account);
    });
    this.model.on("change:deposit", function (deposit) {
      that.renderUpdateDeposit(deposit);
    });
    this.model.on("change:chargeAmountItems", function (chargeAmountItems) {
      that.render(chargeAmountItems);
    });
    /**
     * 현재 가진 금액을 초기화
     * */
    this.model.trigger("change:myAccount");
    this.model.trigger("change:deposit");
    this.model.trigger("change:chargeAmountItems");
    /**
     * UI 이벤트 바인딩
     * */
    Utils.onEvent(Utils.$("#" + this.componentElementId), "click", function (e) {
      var target = e.srcElement;
      if (target.nodeName.toUpperCase() === "BUTTON" || target.parentNode.nodeName.toUpperCase() === "BUTTON") {
        that.clickReturnButton(e, target.parentNode);
      }
    });
    /**
     * 마우스 다운 이벤트시 드래그 시작
     * */
    Utils.onEvent(Utils.$("#" + this.componentElementId), "mousedown", function (e) {
      var target = e.srcElement;
      if (target.nodeName.toUpperCase() === "A") {
        that.dragStart(e, target);
      }
    });
    /**
     * 마우스 업 이벤트 발생시 드래그 끝
     * */
    Utils.onEvent(document, "mouseup", function (e) {
      var target = e.srcElement;
      that.dragEnd(e, target);
    });
    /**
     * 마우스 무브 이벤트 드래깅 이벤트 발생
     * */
    Utils.onEvent(Utils.$("#" + this.componentElementId), "mousemove", function (e) {
      /**
       * 상품을 선택하여 드래그하였을 때만 드래깅 이벤트 동작
       * */
      if (that._machineState.dataTransfer.amount !== 0) {
        that.dragging(e, e.srcElement);
      }
    });
  },
  /**
   * `Payment.myAccount` 정보를 업데이트하고 강제로 트리거
   * @memberOf Payment
   * @param {Number} value 해당 값 만큼 기존 값에 더하거나 뺌
   * @return {Object} Payments
   * */
  updateMyAccount: function (value) {
    var myAccount = this.model.get("myAccount");
    this.model.set({
      myAccount: myAccount + value
    }, {
      trigger: true
    });
    return this;
  },
  /**
   * `Payment.deposit` 정보를 업데이트하고 강제로 트리거
   * @memberOf Payment
   * @param {Number} value 해당 값 만큼 기존 값에 더하거나 뺌
   * @return {Object} Payments
   * */
  updateDeposit: function (value) {
    var deposit = this.model.get("deposit");
    this.model.set({
      deposit: deposit + value
    }, {
      trigger: true
    });
    return this;
  },
  /**
   * 반환 버튼 클릭 이벤트 핸들러
   * @memberOf Payment
   * @param {Event} e 이벤트
   * @param {HTMLElement} target 이벤트가 발생한 객체
   * @return {Object} Payments
   * */
  clickReturnButton: function (e, target) {
    var deposit = this.model.get("deposit");
    this.updateDeposit(-deposit);
    this.updateMyAccount(deposit);
    if (deposit > 0) {
      this.log(Utils.comma(deposit) + "원을 돌려받았습니다.");
      this._machineState = {
        billCount: 0,
        maxAmount: 3000,
        dataTransfer: {
          amount: 0
        }
      };
    } else {
      this.log("돌려받을 금액이 없네요..");
    }
    return this;
  },
  /**
   * 드래그 시작 이벤트 핸들러
   * @memberOf Payment
   * @param {Event} e 이벤트
   * @param {HTMLElement} target 이벤트가 발생한 객체
   * @return {Object} Payments
   * */
  dragStart: function (e, target) {
    var amount = Number(target.getAttribute("data-amount")) || 0;
    var dataTransferData = this._machineState.dataTransfer;
    if (this.model.get("myAccount") >= amount) {
      this.updateMyAccount(-amount);
      dataTransferData.amount = amount;
      this.log(Utils.comma(amount) + "원을 꺼냈습니다!");
    } else {
      this.log("가지고 있는 돈이 부족합니다.");
    }
  },
  /**
   * 드래그 종료 이벤트 핸들러
   * @memberOf Payment
   * @param {Event} e 이벤트
   * @param {HTMLElement} target 이벤트가 발생한 객체
   * @return {Object} Payments
   * */
  dragEnd: function (e, target) {
    var targetId = target.getAttribute("id");
    var targetParentId = target.parentNode.getAttribute("id");
    var dataTransferData = this._machineState.dataTransfer;
    var amount = dataTransferData.amount;
    if (amount) {
      if (targetId === "deposit" || targetParentId === "deposit") {
        this.insertAmount(amount);
      } else {
        this.log("돈을 떨어트렸습니다..");
      }
      dataTransferData.amount = 0;
    }
  },
  /**
   * 드래깅 이벤트 핸들러
   * @memberOf Payment
   * @param {Event} e 이벤트
   * @param {HTMLElement} target 이벤트가 발생한 객체
   * @return {Object} Payments
   * */
  dragging: function (e, target) {
  },
  /**
   * 금액 입력
   * @memberOf Payment
   * @param {Number} amount 입력된 금액
   * @return {Object} Payments
   * */
  insertAmount: function (amount) {
    var machineState = this._machineState;
    var deposit = this.model.get("deposit");
    if ((amount + deposit) > machineState.maxAmount) {
      this.log("총 금액이 " + Utils.comma(machineState.maxAmount) + "원을 초과하여 더이상 넣을 수 없습니다.");
      this.log("돈을 떨어트렸습니다..");
    } else if (amount === 1000 && machineState.billCount >= 2) {
      this.log("자판기가 구식이라 지폐를 두장 이상 넣으실 수 없습니다. 죄송합니다!");
      this.log("돈을 떨어트렸습니다..");
    } else {
      if (amount === 1000) {
        ++this._machineState.billCount;
      }
      this.log(Utils.comma(amount) + "원을 넣었습니다!");
      this.updateDeposit(amount);
    }
    return this;
  },
  /**
   * 콘솔 로그 생성
   * @memberOf Payment
   * @param {String} message
   * @return {Object} Payment
   * */
  log: function (message) {
    ConsoleModel.set({
      log: message
    }, {
      trigger: true
    });
    return this;
  },
  /**
   * 현재 소지중인 금액을 업데이트
   * @memberOf Payment
   * @param {Number} account 현재 소지중인 금액
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
  },
  /**
   * 충전 가능한 금액 목록을 랜더
   * @memberOf Payment
   * @param {Object} chargeAmountItems 금액 목록 정보
   * @return {Object} Payment
   * */
  render: function (chargeAmountItems) {
    var $$root = Utils.$("#wallet > .items")[0];
    var chunk = [];
    for (var item, i = 0, len = chargeAmountItems.length; i < len; i++) {
      item = chargeAmountItems[i];
      chunk.push(
        this.itemTemplate({
          amount: item,
          amountString: Utils.comma(item)
        })
      );
    }
    $$root.innerHTML = chunk.join("");
    return this;
  }
});

module.exports = Payment;
