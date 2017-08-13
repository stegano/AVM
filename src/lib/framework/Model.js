var utils = require("../utils");

/**
 * 데이터를 관리하기 위한 모델, 이벤트를 바인딩하여 데이터의 변경을 감지(`Pub/Sub 패턴`)
 * @constructor
 * */
var Model = function (defaultValue, extOptions) {
  var modelData = utils.extend(defaultValue, extOptions);
  var events = {};
  /**
   * 데이터를 변경
   * @param {String} newData 새로운 데이터
   * @param {Object} options 옵션
   * @return {Object} Model 모델
   * */
  this.set = function (newData, options) {
    var _options = options || {
        silent: false,
        trigger: false
      };
    var changeEvents = null;
    var isNewState = false;
    /**
     * 모델의 변경을 검사
     * */
    for (var n in newData) {
      if (modelData[n] !== newData[n] || _options.trigger === true) {
        isNewState = true;
        changeEvents = events["change:" + n] || [];
        modelData[n] = newData[n];
        for (var i = 0, len = changeEvents.length; i < len; i++) {
          changeEvents[i].call(this, newData[n]);
        }
      }
    }
    /**
     * 모델의 데이터가 하나라도 변경된 경우
     * */
    if ((isNewState && _options.silent !== true) || _options.trigger === true) {
      changeEvents = events["change"] || [];
      for (var i = 0, len = changeEvents.length; i < len; i++) {
        changeEvents[i].call(this, modelData);
      }
    }
    return this;
  };
  /**
   * 데이터를 가져옴.
   * @param {String} key 키 값
   * @return {Object} 데이터
   * */
  this.get = function (key) {
    return modelData[key];
  };
  /**
   * 이벤트 바인딩
   * @param {String} eventName 이벤트 이름
   * @param {Function} callback 콜백함수
   * @return {Function} callback 콜백함수
   * */
  this.on = function (eventName, callback) {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);
    return callback;
  };
  /**
   * 이벤트 바인딩 제거
   * @param {String} eventName 이벤트 이름
   * @param {Function} callback 콜백함수
   * @return {Object} Model 모델
   * */
  this.off = function (eventName, callback) {
    if (eventName) {
      var registeredEvents = events[eventName];
      if (registeredEvents) {
        for (var eventItem, len = registeredEvents.length, i = 0; i < len; i++) {
          eventItem = registeredEvents[i];
          if (eventItem === callback) {
            events[eventName].splice(i, 1);
          }
        }
      }
    } else {
      /**
       * clear
       * */
      events = {};
    }
    return this;
  };
  /**
   * 강제 이벤트를 트리거
   * @param eventName 이벤트 이름
   * @return {Object} Model 모델
   * */
  this.trigger = function (eventName) {
    var registeredEvents = events[eventName];
    var fragments = eventName.split(":");
    var itemName = null;
    if (fragments.length === 2) {
      itemName = fragments[1];
    }
    if (registeredEvents) {
      for (var eventItem, len = registeredEvents.length, i = 0; i < len; i++) {
        eventItem = registeredEvents[i];
        eventItem(modelData[itemName]);
      }
    }
    return this;
  };
  /**
   * @private
   * */
  this._getRawData = function () {
    return modelData;
  };
  /**
   * @private
   * */
  this._getEvents = function () {
    return events;
  };
};

module.exports = Model;
