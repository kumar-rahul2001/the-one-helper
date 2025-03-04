document.addEventListener("DOMContentLoaded", function () {
  // Task 1: Get Current Date
  document.querySelector("#date-btn").addEventListener("click", function () {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const yyyy = today.getFullYear();

    const formats = [
      `${mm}-${dd}-${yyyy}`,
      `${mm}/${dd}/${yyyy}`,
      `${dd}-${mm}-${yyyy}`,
      `${dd}/${mm}/${yyyy}`,
    ];

    Swal.fire(`📅 Today's Date:\n${formats.join("\n")}`);
    document.querySelector(
      "#date-result"
    ).innerHTML = `<strong>${formats[0]}</strong>`;
  });

  // Task 2: Remove Character from String
  document.querySelector("#remove-btn").addEventListener("click", function () {
    const str = document.querySelector("#string-input").value;
    const pos = parseInt(document.querySelector("#char-position").value, 10);

    if (!str || isNaN(pos) || pos < 1 || pos > str.length) {
      Swal.fire("❌ Please enter a valid string and position.");
      return;
    }

    const newStr = str.slice(0, pos - 1) + str.slice(pos);
    Swal.fire(`Updated String: ${newStr}`);
    document.querySelector(
      "#string-result"
    ).innerHTML = `<strong>${newStr}</strong>`;
  });

  // Task 3: Arithmetic Operations
  document
    .querySelector("#calculate-btn")
    .addEventListener("click", function () {
      const num1 = parseFloat(document.querySelector("#num1").value);
      const num2 = parseFloat(document.querySelector("#num2").value);
      const operation = document.querySelector("#operation").value;

      if (isNaN(num1) || isNaN(num2)) {
        Swal.fire("❌ Please enter valid numbers.");
        return;
      }

      let result;
      switch (operation) {
        case "add":
          result = num1 + num2;
          break;
        case "subtract":
          result = num1 - num2;
          break;
        case "multiply":
          result = num1 * num2;
          break;
        case "divide":
          result =
            num2 !== 0
              ? (num1 / num2).toFixed(2)
              : "Infinity (Cannot divide by zero)";
          break;
        default:
          result = "Invalid operation";
      }

      Swal.fire(`Result: ${result}`);
      document.querySelector(
        "#calc-result"
      ).innerHTML = `<strong>${result}</strong>`;
    });
});
