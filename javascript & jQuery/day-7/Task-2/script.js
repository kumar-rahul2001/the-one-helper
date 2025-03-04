$(document).ready(function () {
  // from submission
  $(".profileForm").submit(function (e) {
    e.preventDefault();
    let username = $("#username").val().trim();
    let email = $("#email").val().trim();
    let password = $("#password").val().trim();
    let number = $("#number").val().trim();
    let bio = $("#bio").val().trim();
    let profilePic = $("#profilePic")[0].files[0];

    if (!username || !email || !password || !number || !bio || !profilePic) {
      swal("ERROR!", "Please fill all the required fields!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("UserName", username);
    formData.append("EmailAddress", email);
    formData.append("Password", password);
    formData.append("MobileNumber", number);
    formData.append("Bio", bio);
    formData.append("ProfilePhotoFile", profilePic);

    // ajax api call
    $.ajax({
      url: "http://192.168.1.222:1111/api/User/SaveUserDetails",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      async: true,
      success: function () {
        swal("Good Job!", "User added successfully!", "success");
        $(".profileForm")[0].reset();
        return;
      },
      error: function (error) {
        swal("ERROR!", `${error.responseJSON.message}!`, "error");
        return;
      },
    });
  });
});
