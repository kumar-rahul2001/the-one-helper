$(document).ready(function () {
  const form = $("form");
  const profilePhotoInput = $("#profilePhoto");

  form.on("submit", function (event) {
    event.preventDefault();

    let name = $.trim($("#name").val());
    let email = $.trim($("#email").val());
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    let file = profilePhotoInput[0].files[0];

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        saveUserData(name, email, password, reader.result);
      };
      reader.onerror = function () {
        Swal.fire("Error", "Failed to read image file", "error");
      };
    } else {
      saveUserData(name, email, password, "");
    }
  });

  function saveUserData(name, email, password, profilePhoto) {
    let userData = {
      name: name,
      email: email,
      password: password,
      profilePhoto: profilePhoto,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    Swal.fire("Success", "Registration Successful!", "success");
    form[0].reset();
  }
});
