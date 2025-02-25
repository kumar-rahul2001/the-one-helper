document.addEventListener("DOMContentLoaded", function () {
  const numberInput = document.querySelector("input[type='number']");
  const triangleSelect = document.querySelector("select");
  const outputDiv = document.querySelector(".bg-primary");

  function generateTriangle(rows, type) {
    let result = "";

    switch (type) {
      case "left-triangle":
        for (let i = 1; i <= rows; i++) {
          result += "*".repeat(i) + "<br>";
        }
        break;

      case "reverse-left-triangle":
        for (let i = rows; i >= 1; i--) {
          result += "*".repeat(i) + "<br>";
        }
        break;

      case "right-triangle":
        for (let i = 1; i <= rows; i++) {
          result += "&nbsp;".repeat((rows - i) * 2) + "*".repeat(i) + "<br>";
        }
        break;

      case "reverse-right-triangle":
        for (let i = rows; i >= 1; i--) {
          result += "&nbsp;".repeat((rows - i) * 2) + "*".repeat(i) + "<br>";
        }
        break;

      default:
        result = "Please select a valid triangle type";
    }

    outputDiv.innerHTML = result;
  }

  function updateTriangle() {
    const rows = parseInt(numberInput.value, 10);
    const type = triangleSelect.value;
    if (!isNaN(rows) && rows > 0 && type) {
      generateTriangle(rows, type);
    } else {
      outputDiv.innerHTML = "Show triangle here";
    }
  }

  numberInput.addEventListener("input", updateTriangle);
  triangleSelect.addEventListener("change", updateTriangle);
});
