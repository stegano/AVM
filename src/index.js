/**
 * 스타일시트는 `webpack` 번들링 과정에서 html 문서에 스크립트 파일과 함께 추가 됩니다!
 * */
require("./index.css");
var Display = require("./component/Display");
var Payment = require("./component/Payment");
var Console = require("./component/Console");

/**
 * 이 함수는 `DOMContents`가 모두 로드된 이후에 실행.
 * */
function startApp() {
  Display.execute();
  Payment.execute();
  Console.execute();
}

if (document && "DOMContentLoaded" in document) {
  document.addEventListener("DOMContentLoaded", function () {
    startApp();
  });
} else {
  /**
   * MSIE8 대응
   * */
  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      startApp();
    }
  }
}
