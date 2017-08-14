var $ = require("../src/lib/utils").$;
var expect = require("chai").expect;

describe("`Selector` 테스트", function () {
  before(function () {
    /**
     * 테스트할 HTML을 미리 만듬
     * */
    document.body.innerHTML = '<div id="parent" data-value="111"><div id="child" data-value="222">Test1234</div></div><div id="htmlTest"><span>a</span><span>b</span></div>';
  });
  it("`Selector.prototype.find` 테스트", function () {
    var actual = null;
    var expected = 1;
    actual = $("#parent", document.body);
    expect(actual.length).to.equal(expected);
    actual = $("#parent", document.body).find("#child");
    expect(actual.length).to.equal(expected);
    actual = $("#child", document.body);
    expect(actual.length).to.equal(expected);
  });
  it("`Selector.prototype.attr(key)` 테스트", function () {
    var actual = $("#parent").attr("data-value");
    var expected = "111";
    expect(actual).to.equal(expected);
  });
  it("`Selector.prototype.attr(key, value)` 테스트", function () {
    $("#parent").attr("data-value", "abc");
    var actual = $("#parent").attr("data-value");
    var expected = "abc";
    expect(actual).to.equal(expected);
  });
  it("`Selector.prototype.text()` 테스트", function () {
    var actual = $("#child").text();
    var expected = "Test1234";
    expect(actual).to.equal(expected);
  });
  it("`Selector.prototype.text(textString)` 테스트", function () {
    $("#child").text("1234Test");
    var actual = $("#child").text();
    var expected = "1234Test";
    expect(actual).to.equal(expected);
  });
  it("`Selector.prototype.html()` 테스트", function () {
    var actual = $("#htmlTest").html();
    var expected = "<span>a</span><span>b</span>";
    expect(actual).to.equal(expected);
  });
  it("`Selector.prototype.html(htmlString)` 테스트", function () {
    $("#htmlTest").html("<span>htmlTest</span>");
    var actual = $("#htmlTest").html();
    var expected = "<span>htmlTest</span>";
    expect(actual).to.equal(expected);
  });
  it("`Selector.prototype.indexOf` 테스트", function () {
    var $elements = $("body *");
    var expected = 1;
    var actual = $elements.indexOf($elements[1]);
    expect(actual).to.equal(expected);
  });
});
