var View = require("../../lib/framework/View");
var Utils = require("../../lib/utils");
var model = require("./model");
var ConsoleModel = require("../Console/model");
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
     * 현재 가진 금액을 초기화
     * */
    this.model.trigger("change:myAccount");
    this.model.trigger("change:deposit");
    /**
     * UI 이벤트 바인딩
     * */
    Utils.onEvent(Utils.$("#" + this.componentElementId), "click", function (e) {
      var target = e.srcElement;
      if (target.parentNode.nodeName.toUpperCase() === "BUTTON") {
        that.clickReturnButton(e, target.parentNode);
      }
    });
    /**
     * 마우스가 영역 밖으로 나가는 경우 드래그 이벤트를 종료
     * */
    Utils.onEvent(Utils.$("#" + this.componentElementId), "mouseleave", function (e) {
      that.dragCancel(e);
    });
    /**
     * 마우스 다운로드시 드래그 시작
     * */
    Utils.onEvent(Utils.$("#" + this.componentElementId), "mousedown", function (e) {
      var target = e.srcElement;
      if (target.nodeName.toUpperCase() === "A") {
        that.dragStart(e, target);
      }
    });
    /**
     * 마우스 다운로드시 드래그 끝
     * */
    Utils.onEvent(window, "mouseup", function (e) {
      var target = e.srcElement;
      that.dragEnd(e, target);
    });
  },
  updateMyAccount: function (value) {
    var myAccount = this.model.get("myAccount");
    this.model.set({
      myAccount: myAccount + value
    }, {
      trigger: true
    });
    return this;
  },
  updateDeposit: function (value) {
    var deposit = this.model.get("deposit");
    this.model.set({
      deposit: deposit + value
    }, {
      trigger: true
    });
    return this;
  },
  updateDataTransfer: function (value) {
    this.model.set({
      dataTransfer: value
    }, {
      trigger: true
    });
    return this;
  },
  clickReturnButton: function (e, target) {
    var deposit = this.model.get("deposit");
    this.updateDeposit(-deposit);
    this.updateMyAccount(deposit);
    if (deposit > 0) {
      this.log(Utils.comma(deposit) + "원을 돌려받았습니다.");
      /**
       * 자판기 상태를 초기로 돌림
       * */
      this.model.set({
        machineState: {
          billCount: 0,
          maxAmount: 3000
        }
      });
    } else {
      this.log("돌려받을 금액이 없네요..");
    }
    return this;
  },
  dragStart: function (e, target) {
    var amount = Number(target.getAttribute("data-amount")) || 0;
    if (this.model.get("myAccount") >= amount) {
      this.updateMyAccount(-amount);
      this.updateDataTransfer({
        amount: amount
      });
      this.log(Utils.comma(amount) + "원을 꺼냈습니다!");
    } else {
      this.log("가지고 있는 돈이 부족합니다.");
    }
  },
  dragEnd: function (e, target) {
    var targetId = target.getAttribute("id");
    var dataTransferData = this.model.get("dataTransfer");
    var amount = dataTransferData.amount;
    if (amount) {
      if (targetId === "deposit") {
        this.insertAmount(amount);
      } else {
        this.log("돈을 떨어트렸습니다..");
      }
      this.updateDataTransfer({});
    }
  },
  dragCancel: function (e, target) {
    this.updateDataTransfer({});
  },
  insertAmount: function (amount) {
    var machineState = this.model.get("machineState");
    var deposit = this.model.get("deposit");
    if ((amount + deposit) > machineState.maxAmount) {
      this.log("총 금액이 " + Utils.comma(machineState.maxAmount) + "원을 초과하여 더이상 넣을 수 없습니다.");
      this.log("돈을 떨어트렸습니다..");
    } else if (amount === 1000 && machineState.billCount >= 2) {
      this.log("자판기가 구식이라 지폐를 두장 이상 넣으실 수 없습니다. 죄송합니다!");
      this.log("돈을 떨어트렸습니다..");
    } else {
      if (amount === 1000) {
        ++machineState.billCount;
        this.model.set({
          machineState: machineState
        });
      }
      this.log(Utils.comma(amount) + "원을 넣었습니다!");
      this.updateDeposit(amount);
    }
    return this;
  },
  /**
   * 콘솔 로그 생성
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
