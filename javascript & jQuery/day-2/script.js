document.addEventListener("DOMContentLoaded", function () {
  // Task 1: Print Triangle
  document
    .querySelector(".btn-outline-primary")
    .addEventListener("click", function () {
      const numberInput = document.querySelector("input[type=number]").value;
      const selectOption = document.querySelector("select").value;
      const resultDiv = document.querySelector(".display-triangle");
      let output = "";
      const n = parseInt(numberInput);

      if (isNaN(n) || n <= 0) {
        Swal.fire("Error", "Please enter a valid positive number!", "error");
        return;
      }

      switch (selectOption) {
        case "left-triangle":
          for (let i = 1; i <= n; i++) {
            output += "* ".repeat(i) + "<br>";
          }
          break;
        case "reverse-left-triangle":
          for (let i = n; i >= 1; i--) {
            output += "* ".repeat(i) + "<br>";
          }
          break;
        case "right-triangle":
          for (let i = 1; i <= n; i++) {
            output += "&nbsp;".repeat(n - i) + "*".repeat(i) + "<br>";
          }
          break;
        case "reverse-right-triangle":
          for (let i = n; i >= 1; i--) {
            output += "&nbsp;".repeat(n - i) + "*".repeat(i) + "<br>";
          }
          break;
        default:
          Swal.fire("Error", "Please select a triangle type!", "error");
          return;
      }
      resultDiv.innerHTML = output;
    });

  // Task 2: Find Largest Number
  document
    .querySelectorAll(".btn-outline-primary")[1]
    .addEventListener("click", function () {
      const numberInput = document.querySelectorAll(
        ".largest-number-input"
      ).value;
      console.log(numberInput);
      const numbers = numberInput
        .split(",")
        .map((num) => parseFloat(num.trim()));

      if (numbers.length !== 5 || numbers.some(isNaN)) {
        Swal.fire(
          "Error",
          "Please enter exactly five valid numbers separated by commas!",
          "error"
        );
        return;
      }

      const maxNumber = Math.max(...numbers);
      Swal.fire(
        "Largest Number",
        `The largest number is: ${maxNumber}`,
        "success"
      );
    });

  // Task 3: Detect Data Type
  document
    .querySelectorAll(".btn-outline-primary")[2]
    .addEventListener("click", function () {
      const inputData = document.querySelectorAll("input[type=text]")[0].value;
      let dataType;

      if (!isNaN(inputData) && inputData.trim() !== "") {
        dataType = "Number";
      } else if (
        inputData.toLowerCase() === "true" ||
        inputData.toLowerCase() === "false"
      ) {
        dataType = "Boolean";
      } else {
        dataType = "String";
      }

      Swal.fire("Data Type", `The entered data type is: ${dataType}`, "info");
    });
});
