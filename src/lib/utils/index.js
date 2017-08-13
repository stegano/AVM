/**
 * 정규식 패턴
 * @memberOf Utils
 * @private
 * */
var regExp = {
  comma: /\B(?=(\d{3})+(?!\d))/g,
  templateInterpolate: /{{=.+?}}/gm
};
/**
 * 유틸 함수
 * @namespace Utils
 * */
var Utils = {
  /**
   * 간단한 템플릿 엔진
   * @memberOf Utils
   * @param {String} htmlString
   * @return {Function} replaceTemplateData
   * */
  template: function (htmlString) {
    var _htmlTemplate = htmlString.replace(/^\s*|\s*$/gm, "");
    /**
     * 입력된 정보로 템플릿의 값을 치환
     * @param {Object} data 치환할 데이터
     * @return {String} htmlString
     * */
    return function replaceTemplateData(data) {
      var ret = _htmlTemplate;
      for (var n in data) {
        ret = ret.replace(new RegExp("{{=" + n + "}}", "gm"), data[n]);
      }
      ret = ret.replace(regExp.templateInterpolate, '');
      return ret;
    };
  },
  /**
   * `querySelector`를 좀 더 편하게 사용하기 위한 함수
   * @memberOf Utils
   * @param {String} querySelector 셀렉터
   * @return {HTMLElement}
   * */
  $: function (querySelector) {
    var ret = null;
    var fragments = querySelector.split(" ");
    if (fragments[fragments.length - 1][0] === "#") {
      ret = document.querySelector(querySelector);
    } else {
      ret = document.querySelectorAll(querySelector);
    }
    return ret;
  },
  /**
   * 숫자에 콤마 추가
   * @memberOf Utils
   * @param {Number} number 정수
   * @return {String}
   * */
  comma: function (number) {
    return number.toString().replace(regExp.comma, ",");
  },
  /**
   * 랜덤 숫자 생성
   * @memberOf Utils
   * @param {Number} min 최소 값
   * @param {Number} max 최대 값
   * @return {Number} `min ~ max` 사이의 정수
   * */
  genRandomValue: function (min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
  },
  /**
   * DOM 이벤트 바인딩
   * @memberOf Utils
   * @param {HTMLElement} element 엘리먼트 이름
   * @param {String} eventName 이벤트 이름
   * @param {Function} callback 콜백 함수
   * @return {HTMLElement}
   * */
  onEvent: function (element, eventName, callback) {
    if ("addEventListener" in element) {
      element.addEventListener(eventName, callback);
    } else {
      element.attachEvent("on" + eventName, callback);
    }
    return element;
  },
  /**
   * `Function.prototype.bind` 구현
   * @memberOf Utils
   * @param {Function} func 함수
   * @param {Object} context 함수 실행시점 컨텍스트
   * @param {Array} args 입력 값들
   * */
  bind: function (func, context, args) {
    var bindArgs = Array.prototype.slice.call(arguments, 2);
    return function () {
      var execFuncArgs = Array.prototype.slice.call(arguments, 0);
      return func.apply(context, bindArgs.concat(execFuncArgs));
    };
  },
  /**
   * `Object`를 확장하는 함수
   * @memberOf Utils
   * @param {Object} targetObject 확장될 대상
   * @param {Object} sourceObject 확장할 소스
   * @return {Object} targetObject 확장된 대상 오브젝트
   * */
  extend: function (targetObject, sourceObject) {
    for (var n in sourceObject) {
      targetObject[n] = sourceObject[n];
    }
    return targetObject;
  }
};

module.exports = Utils;
