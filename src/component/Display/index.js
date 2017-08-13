var View = require("../../lib/framework/View");
var Utils = require("../../lib/utils");
var $ = Utils.$;
var model = require("./model");
var PaymentModel = require("../Payment/model");
var ConsoleModel = require("../Console/model");
/**
 * 판매 상품을 보여주는 뷰 컴포넌트
 * @class
 * @constructor
 * @extends View
 * */
var Display = View.extend({
  model: model,
  initialize: function (data) {
    var that = this;
    /**
     * 해당 컴포넌트의 최상위 DOMElementId
     * @memberOf Payment
     * @member {Function} String
     * */
    this.componentRootElementId = data.componentRootElementId;
    /**
     * 뷰에서 사용되는 아이템 템플릿
     * @memberOf Payment
     * @member {Function} replaceTemplateData
     * */
    this.itemTemplate = Utils.template($("#DisplayItemTemplate").html());
    /**
     * 모델 이벤트 바인딩
     * */
    this.model.on("change:items", function (items) {
      that.render(items);
    });
    /**
     * 기본 설정으로 아이템 생성
     * */
    var itemNames = this.model.get("itemNames");
    this.model.set({
      items: this.genItems(itemNames, 100, 800, 1, 3)
    });
    /**
     * UI 이벤트 바인딩
     * */
    $("#" + this.componentRootElementId).on("click", "a[data-count]", function (e) {
      that.clickItemAnchor(e, e.custom.target);
    });
  },
  /**
   * 콘솔 로그 생성
   * @memberOf Display
   * @param {String} message 메세지
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
  /**
   * 아이템 클릭 이벤트 핸들러
   * @memberOf Display
   * @param {Event} e 이벤트
   * @param {HTMLElement} target 이벤트가 발생한 객체
   * @return {Object} Display
   * */
  clickItemAnchor: function (e, target) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var name = $(target).attr("data-name");
    var price = Number($(target).attr("data-price")) || 0;
    var count = Number($(target).attr("data-count")) || 0;
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
          --items[i].count;
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
    var _itemNames = itemNames instanceof Array ? itemNames : [];
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
    var $root = $("#" + this.componentRootElementId + "> .items");
    var chunk = [];
    for (var item, i = 0, len = items.length; i < len; i++) {
      item = items[i];
      chunk.push(
        this.itemTemplate({
          productName: item.name,
          price: item.price,
          count: item.count,
          classList: item.count === 0 ? "soldout" : ""
        })
      );
    }
    $root.html(chunk.join(""));
    return this;
  }
});

module.exports = Display;
