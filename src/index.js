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
