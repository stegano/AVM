var utils = require("../utils");

/**
 * 데이터를 관리하기 위한 모델, 이벤트를 바인딩하여 데이터의 변경을 감지(`Pub/Sub 패턴`)
 * @constructor
 * */
var Model = function (defaultValue, extOptions) {
  /**
   * 데이터 저장소
   * @private
   * @type {Object}
   * */
  var modelData = utils.extend(defaultValue, extOptions) || {};
  /**
   * 이벤트 저장소
   * @private
   * @type {Object}
   * */
  var events = {};
  /**
   * `prototype`에서 접근하기 위한 참조
   * @type {Object}
   * */
  this.__private__ = {
    modelData: modelData,
    events: events
  };
};
/**
 * 데이터를 변경
 * @param {String} newData 새로운 데이터
 * @param {Object} options 옵션
 * @return {Object} Model 모델
 * */
Model.prototype.set = function (newData, options) {
  var modelData = this.__private__.modelData;
  var events = this.__private__.events;
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
Model.prototype.get = function (key) {
  return this.__private__.modelData[key];
};
/**
 * 이벤트 바인딩
 * @param {String} eventName 이벤트 이름
 * @param {Function} callback 콜백함수
 * @return {Function} callback 콜백함수
 * */
Model.prototype.on = function (eventName, callback) {
  var events = this.__private__.events;
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
Model.prototype.off = function (eventName, callback) {
  var events = this.__private__.events;
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
    this.__private__.events = {};
  }
  return this;
};
/**
 * 강제 이벤트를 트리거
 * @param eventName 이벤트 이름
 * @return {Object} Model 모델
 * */
Model.prototype.trigger = function (eventName) {
  var modelData = this.__private__.modelData;
  var events = this.__private__.events;
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
Model.prototype._getRawData = function () {
  return this.__private__.modelData;
};
/**
 * @private
 * */
Model.prototype._getEvents = function () {
  return this.__private__.events;
};

module.exports = Model;
