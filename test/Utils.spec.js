var Utils = require("../src/lib/utils");
var expect = require("chai").expect;

describe("`Utils` 테스트", function () {
  it("`template` 테스트", function () {
    var actual = Utils.template("<div>{{=message}}</div>")({
      message: "HELLO:)"
    });
    var expected = "<div>HELLO:)</div>";
    expect(actual).to.equal(expected);
  });
  it("`comma` 테스트", function () {
    var actual = null;
    var expected = null;
    // `123`
    actual = Utils.comma(123);
    expected = "123";
    expect(actual).to.equal(expected);
    // `1234`
    actual = Utils.comma(1234);
    expected = "1,234";
    expect(actual).to.equal(expected);
    // `12345`
    actual = Utils.comma(12345);
    expected = "12,345";
    expect(actual).to.equal(expected);
    // `123456`
    actual = Utils.comma(123456);
    expected = "123,456";
    expect(actual).to.equal(expected);
    // `1234567`
    actual = Utils.comma(1234567);
    expected = "1,234,567";
    expect(actual).to.equal(expected);
  });
  it("`genRandomValue` 테스트", function () {
    var actual = null;
    for (var i = 0, len = 100; i < len; i++) {
      actual = Utils.genRandomValue(2, 5);
      expect(actual).to.above(1).to.below(6);
    }
  });
  it("`bind` 테스트", function () {
    function test(a, b, c) {
      return [a, b, c];
    }

    var actual = Utils.bind(test, this, 1, 2, 3)();
    var expected = [1, 2, 3];
    expect(actual).to.deep.equal(expected);
  });
  it("`bind` `this Binding` 테스트", function () {
    function thisName(a, b, c) {
      return this.name;
    }

    var actual = Utils.bind(thisName, {name: "aa"}, 1, 2, 3);
    var expected = "aa";
    expect(actual()).to.equal(expected);
  });
  it("`extend` 테스트", function () {
    var target = {
      a: 1
    };
    var actual = Utils.extend(target, {
      b: 1,
      c: 1
    });
    var expected = {
      a: 1,
      b: 1,
      c: 1
    };
    expect(actual).to.deep.equal(expected);
  });
});
