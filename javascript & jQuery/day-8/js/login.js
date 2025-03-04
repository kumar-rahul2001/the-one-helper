$(document).ready(function () {
  // from submission
  $(".profileForm").submit(function (e) {
    e.preventDefault();
    let username = $("#username").val().trim();
    // let email = $("#email").val().trim();
    let password = $("#password").val().trim();

    if (!username || !password) {
      swal("ERROR!", "Please fill all the required fields!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("userName", username);
    // formData.append("EmailAddress", email);
    formData.append("password", password);

    // ajax api call
    $.ajax({
      url: "http://192.168.1.222:1111/api/User/LoginUser",
      method: "POST",
      // data: formData,
      data: JSON.stringify({
        userName: username,
        password: password,
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: true,
      success: function (response) {
        $(".profileForm")[0].reset();
        localStorage.setItem("user", JSON.stringify(response.response));
        window.location.href = "createandjoinroom.html";
        // swal("Success", "User logged in successfully!", "success");
        return;
      },
      error: function (error) {
        console.log(error);
        swal("ERROR!", `${error.statusText}!`, "error");
        return;
      },
    });
  });
});
