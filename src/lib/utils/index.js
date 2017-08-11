var Utils = {
  /**
   * 간단한 템플릿 엔진
   * @param {String} htmlString
   * @return {Function} replaceTemplateData
   * */
  template: function (htmlString) {
    var _htmlTemplate = htmlString.replace(/^\s*|\s*/gm, '');
    /**
     * @param {Object} data 치환할 데이터
     * */
    return function replaceTemplateData(data) {
      var ret = _htmlTemplate;
      for (var n in data) {
        ret = ret.replace(new RegExp("{{=" + n + "}}", "gm"), data[n]);
      }
      return ret;
    };
  },
  /**
   * `querySelector`를 좀 더 편하게 사용하기 위한 함수
   * @param {String} querySelector 셀렉터
   * @return {HTMLElement}
   * */
  $: function (querySelector) {
    var ret = null;
    var fragments = querySelector.split(" ");
    if (fragments[fragments.length - 1][0] === "#") {
      ret = document.querySelector(querySelector)
    } else {
      ret = document.querySelectorAll(querySelector);
    }
    return ret;
  },
  /**
   * 숫자에 콤마 추가
   * */
  comma: function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

module.exports = Utils;
