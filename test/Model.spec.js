var Model = require("../src/lib/framework/Model.js");
var expect = require("chai").expect;

describe("`Model` 테스트", function () {
  var testModel = null;
  it("Model 객체 생성", function () {
    testModel = new Model();
    expect(testModel).to.instanceOf(Model);
  });
  it("데이터 입력, 가져오기", function () {
    var expected = 1234;
    testModel.set({
      testData: expected
    });
    var actual = testModel.get("testData");
    expect(actual).to.equal(expected);
  });
  it("새로운 데이터 입력시 이벤트", function (done) {
    var actual = 123;
    testModel.on("change:newField", function (expected) {
      expect(actual).to.equal(expected);
      /**
       * 다음 테스트를 위해 모든 이벤트를 제거
       * */
      testModel.off();
      done();
    });
    testModel.set({
      newField: actual
    });
  });
  it("이벤트 모두 제거", function () {
    testModel.on("change:test1", function () {
    });
    testModel.on("change:test2", function () {
    });
    testModel.off();
    var actual = testModel._getEvents();
    var expected = {};
    expect(actual).to.deep.equal(expected);
  });
  it("기존 데이터 입력시 이벤트", function (done) {
    var actual = 111;
    testModel.on("change:newField", function (expected) {
      expect(actual).to.equal(expected);
      /**
       * 다음 테스트를 위해 모든 이벤트를 제거
       * */
      testModel.off();
      done();
    });
    testModel.set({
      newField: actual
    });
  });
  it("데이터 변경 이벤트", function (done) {
    var actual = 1;
    testModel.on("change", function (expected) {
      expect(testModel._getRawData()).to.equal(expected);
      /**
       * 다음 테스트를 위해 모든 이벤트를 제거
       * */
      testModel.off();
      done();
    });
    testModel.set({
      newField: actual
    });
  });
  it("`options.trigger` 테스트", function (done) {
    var actual = 1;
    testModel.on("change", function (expected) {
      expect(testModel._getRawData()).to.equal(expected);
      /**
       * 다음 테스트를 위해 모든 이벤트를 제거
       * */
      testModel.off();
      done();
    });
    testModel.set({
      newField: actual
    }, {
      trigger: true
    });
  });
  it("`options.silent` 테스트", function (done) {
    var actual = 222;
    testModel.on("change", function (expected) {
      /**
       * `change` 이벤트가 발생한다면 테스트에 실패
       * */
      expect(false).to.equal(true);
    });
    testModel.set({
      newField: actual
    }, {
      silent: true
    });
    setTimeout(function () {
      /**
       * `change` 이벤트가 발생하지 않았다면 테스트 성공
       * */
      done();
    }, 1);
  });
});
