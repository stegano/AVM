var View = require("../../lib/framework/View");
var Utils = require("../../lib/utils");
var model = require("./model");
/**
 * 콘솔을 보여주는 뷰 컴포넌트
 * @namespace Console
 * */
var Console = View.extend({
  componentElementId: "console",
  model: model,
  initialize: function () {
    var that = this;
    this.itemTemplate = Utils.template(Utils.$("#ConsoleLogItemTemplate").innerHTML);
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
    var $console = Utils.$("#console .items")[0];
    var logs = $console.innerHTML + this.itemTemplate({
        logMessage: log
      });
    $console.innerHTML = logs;
    return this;
  },
  /**
   * 스크롤 최하단으로 이동
   * @memberOf Console
   * @return {Object} Console
   * */
  setScrollBottom: function () {
    var $consoleWrapper = Utils.$("#" + this.componentElementId);
    $consoleWrapper.scrollTop = $consoleWrapper.scrollHeight;
    return this;
  }
});

module.exports = Console;
