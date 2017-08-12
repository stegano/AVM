/**
 * 스타일은 `webpack` 번들링 과정에서 html 문서에 스크립트 파일과 함께 추가 됩니다!
 * */
require("./index.css");

function startApp() {
  require("./component/Display");
  require("./component/Payment");
  require("./component/Console");
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
