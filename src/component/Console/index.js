var View = require("../../lib/framework/View");
var Utils = require("../../lib/utils");
var $ = Utils.$;
var model = require("./model");
/**
 * 콘솔을 보여주는 뷰 컴포넌트
 * @class
 * @constructor
 * @extends View
 * */
var Console = View.extend({
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
     * @memberOf Console
     * @member {Function} replaceTemplateData
     * */
    this.itemTemplate = Utils.template($("#ConsoleLogItemTemplate").html());
    /**
     * 모델 이벤트 바인딩
     * */
    this.model.on("change:log", function (log) {
      that.renderNewLog(log);
      that.setScrollBottom();
    });
  },
  /**
   * 최근 입력된 로그를 추가
   * @memberOf Console
   * @param {String} log 로그 메세지
   * @return {Object} Console
   * */
  renderNewLog: function (log) {
    var $console = $("#console .items");
    var logs = $console.html() + this.itemTemplate({
        logMessage: log
      });
    $console.html(logs);
    return this;
  },
  /**
   * 스크롤 최하단으로 이동
   * @memberOf Console
   * @return {Object} Console
   * */
  setScrollBottom: function () {
    var $consoleWrapper = $("#" + this.componentRootElementId);
    $consoleWrapper[0].scrollTop = $consoleWrapper[0].scrollHeight;
    return this;
  }
});

module.exports = Console;
