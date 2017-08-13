/**
 * `Array-like` 를 이용한 `jQuery-style` 유틸
 * @constructor
 * @param {NodeList} defaultElements 노드 리스트
 * @return {Object} Selector
 * */
function Selector(defaultElements) {
  var _defaultElements = defaultElements || [];
  _defaultElements = _defaultElements.nodeType === 1 ? [_defaultElements] : _defaultElements;

  if (defaultElements)
    switch (_defaultElements.length) {
      case 0:
        break;
      case 1:
        this.push.call(this, _defaultElements);
        break;
      default:
        var nodes = _defaultElements;
        for (var i = 0, len = nodes.length; i < len; i++) {
          this.push.call(this, nodes[i]);
        }
    }
  return this;
}
/**
 * CSS 쿼리셀렉터를 이용하여 원하는 `HTMLElement`를 선택
 * @param {string} querySelector 쿼리 셀렉터
 * @param {HTMLElement} [element] element 값이 입력되면 해당 객체가 루트가되어 하위에서 객체를 탐색
 * @return {Object} Selector
 * */
Selector.prototype.find = function (querySelector, element) {
  var newSelector = new Selector();
  var _querySelector = querySelector || "";
  var root = element && element.nodeType === 1 ? element : document;
  /**
   * 입력된 셀렉터에 따라 동작을 변경
   */
  switch (typeof _querySelector) {
    case "string":
      /**
       *  DOM 생성
       */
      if (/^<\w+?/.test(_querySelector)) {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = _querySelector;
        this.push.apply(newSelector, wrapper.childNodes);
      } else {
        var fragments = _querySelector.split(" ");
        /**
         *  DOM 탐색
         */
        if (fragments[fragments.length - 1][0] === "#") {
          this.push.call(newSelector, root.querySelector(_querySelector));
        } else {
          var nodes = root.querySelectorAll(_querySelector);
          for (var i = 0, len = nodes.length; i < len; i++) {
            this.push.call(newSelector, nodes[i]);
          }
        }
      }
      break;
    case "object":
      /**
       *  엘리먼트가 입력된 경우
       */
      if (_querySelector.nodeType === 1) {
        this.push.call(newSelector, _querySelector);
      }
      break;
  }
  return newSelector;
};
/**
 * @deprecated
 * */
Selector.prototype.clear = function () {
  this.splice(0, this.length);
  return this;
};
/**
 * 엘리먼트의 속성을 가져옴
 * @param {String} key 속성 이름
 * @param {String} [value] 속성 값
 * @return {String | Selector} `key`, `value` 모두 입력시 `Selector` 객체를 리턴, 그렇지 않을경우 String(value) 리턴
 * */
Selector.prototype.attr = function (key, value) {
  var ret = this;
  if (this.length > 0) {
    ret = this[0];
    if (key && value) {
      ret.setAttribute(key, value);
      ret = new Selector(ret);
    } else if (key) {
      ret = ret.getAttribute(key);
    }
  }
  return ret;
};
/**
 * 엘리먼트의 html 정보를 가져옴
 * @param {String} [htmlString] 속성 이름
 * @return {String | Selector} `htmlString` 입력시 해당 엘리먼트의 `htmlString`을 입력 그렇지 않을경우 `Selector` 객체를 리턴
 * */
Selector.prototype.html = function (htmlString) {
  var ret = this;
  if (this.length > 0) {
    ret = this[0];
    if (htmlString) {
      ret.innerHTML = htmlString;
      ret = new Selector(ret);
    }
    ret = ret.innerHTML;
  }
  return ret;
};
/**
 * 엘리먼트의 text 정보를 가져옴
 * @param {String} [textString] 속성 이름
 * @return {String | Selector} `htmlString` 입력시 해당 엘리먼트의 `textString`을 입력 그렇지 않을경우 `Selector` 객체를 리턴
 * */
Selector.prototype.text = function (textString) {
  var ret = this;
  if (this.length > 0) {
    ret = this[0];
    if (textString) {
      ret.innerText = textString;
      ret = new Selector(ret);
    }
    ret = ret.innerText;
  }
  return ret;
};
/**
 * `Array.prototype.indexOf`와 동일하게 동작
 * @param {HTMLElement} HTMLElement 탐색하고자 하는 `HTMLElement`
 * @return {Number} 해당 객체가 존재하면 `-1`보다 큰 수를 리턴 그렇지 않을경우 `-1` 리턴
 * */
Selector.prototype.indexOf = function (HTMLElement) {
  var ret = -1;
  for (var i = 0, len = this.length; i < len; i++) {
    if (HTMLElement === this[i]) {
      ret = i;
      break;
    }
  }
  return ret;
};
/**
 * `HTMLElement` 객체에 이벤트를 연결
 * @param {String} eventName 이벤트 이름
 * @param {String} [querySelector] 셀렉터 입력시 이벤트를 위임받아 부모 객체에서 처리
 * @param {Function} callback 콜백 함수
 * @return {Object} Selector
 * */
Selector.prototype.on = function (eventName, querySelector, callback) {
  /**
   * 인자값이 3개인 경우 이벤트를 위임받아 부모 이벤트에서 처리
   * */
  if (this.length > 0) {
    if (arguments.length === 3) {
      var $root = this;
      if ("addEventListener" in this[0]) {
        this[0].addEventListener(eventName, function (e) {
          var element = e.srcElement;
          var targetList = $root.find(querySelector);
          do {
            if (targetList.indexOf(element) !== -1) {
              e.custom = {
                target: element
              };
              return callback.apply(element, arguments);
            }
          } while (element = element.parentNode);
        });
      } else {
        this[0].attachEvent("on" + eventName, function (e) {
          var element = e.srcElement;
          var targetList = $root.find(querySelector);
          do {
            if (targetList.indexOf(element) !== -1) {
              e.custom = {
                target: element
              };
              return callback.apply(element, arguments);
            }
          } while (element = element.parentNode);
        });
      }
    } else {
      callback = querySelector;
      if ("addEventListener" in this[0]) {
        this[0].addEventListener(eventName, callback);
      } else {
        this[0].attachEvent("on" + eventName, callback);
      }
    }
  }
  return new Selector(this[0]);
};

Selector.prototype.splice = Array.prototype.splice;
Selector.prototype.length = Array.prototype.length;
Selector.prototype.concat = Array.prototype.concat;
Selector.prototype.push = function () {
  return Array.prototype.push.apply(this, arguments);
};

module.exports = Selector;
