var View = require("../../lib/framework/View");
var Utils = require("../../lib/utils");
var model = require("./model");
var PaymentModel = require("../Payment/model");
var ConsoleModel = require("../Console/model");

/**
 * 판매 상품을 보여주는 뷰 컴포넌트
 * @namespace Display
 * */
var Display = new View({
  componentElementId: "display",
  model: model,
  initialize: function () {
    var that = this;
    this.itemTemplate = Utils.template(Utils.$("#DisplayItemTemplate").innerHTML);
    /**
     * 모델 이벤트 바인딩
     * */
    this.model.on("change:items", function (items) {
      that.render(items);
    });
    /**
     * 기본 설정으로 아이템 생성
     * */
    this.model.set({
      items: this.genItems(null, 100, 800, 1, 3)
    });
    /**
     * UI 이벤트 바인딩
     * */
    Utils.onEvent(Utils.$("#" + this.componentElementId), "click", function (e) {
      var target = e.srcElement;
      if (target.parentNode.nodeName.toUpperCase() === "A") {
        that.clickItemAnchor(e, target.parentNode);
      }
    });
  },
  /**
   * 콘솔 로그 생성
   * @param {String} message
   * @return {Object} Display
   * */
  log: function (message) {
    ConsoleModel.set({
      log: message
    }, {
      trigger: true
    });
    return this;
  },
  clickItemAnchor: function (e, target) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var name = target.getAttribute("data-name");
    var price = Number(target.getAttribute("data-price")) || 0;
    var count = Number(target.getAttribute("data-count")) || 0;
    var deposit = PaymentModel.get("deposit");
    this.log("[" + name + "](을)를 선택 하셨습니다.");
    if (count === 0) {
      this.log("죄송합니다. 이 제품은 품절 되었습니다!");
    } else if (deposit < price) {
      this.log("잔액이 부족합니다. 투입구에 돈을 넣어주세요!");
    } else {
      /**
       * 결제 금액만큼 차감
       */
      PaymentModel.set({
        deposit: deposit - price
      });
      /**
       * 진열된 상품의 정보를 업데이트
       * */
      var items = this.model.get("items");
      for (var it, i = 0, len = items.length; i < len; i++) {
        it = items[i];
        if (it.name === name) {
          items[i].count--;
          break;
        }
      }
      /**
       * 래퍼런스의 경우 변경사항을 체크하지 못함
       * 강제 트리거
       * */
      this.model.set({
        items: items
      }, {
        trigger: true
      });
      this.log("감사합니다. 결제가 완료 되었습니다.");
      this.log("[" + name + "](이)가 나왔습니다.");
    }
    return this;
  },
  /**
   * 아이템 정보를 생성
   * @memberOf Display
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
      name = _itemNames.splice(Utils.genRandomValue(0, _itemNames.length - 1), 1)[0];
      price = Math.round(Utils.genRandomValue(_minPrice, _maxPrice) / 100) * 100;
      count = Utils.genRandomValue(_minCount, _maxCount);
      ret.push({
        name: name,
        price: price,
        count: count
      });
    }
    return ret;
  },
  /**
   * 아이템을 그림
   * @memberOf Display
   * @param {Object[]} items 아이템 정보
   * @return {Object} Display
   * */
  render: function (items) {
    var $$root = Utils.$("#" + this.componentElementId + "> .items")[0];
    var chunk = [];
    for (var item, i = 0, len = items.length; i < len; i++) {
      item = items[i];
      chunk.push(
        this.itemTemplate({
          productName: item.name,
          price: item.price,
          count: item.count
        })
      );
    }
    $$root.innerHTML = chunk.join("");
    return this;
  }
});

module.exports = Display;
