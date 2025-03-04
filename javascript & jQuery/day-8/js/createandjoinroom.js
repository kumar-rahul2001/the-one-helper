$(document).ready(function () {
  // create room
  $(".create-room").submit(function (e) {
    e.preventDefault();
    let roomname = $("#roomname").val().trim();
    let roomProfile = $("#roomProfile")[0].files[0];

    if (!roomname || !roomProfile) {
      swal("ERROR!", "Please fill all the required fields!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("RoomName", roomname);
    formData.append("RoomProfile", roomProfile);

    const token = JSON.parse(localStorage.getItem("user")).authToken;

    // ajax api call
    $.ajax({
      url: "http://192.168.1.222:1111/api/Room/SaveRoomDetails",
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      data: formData,
      processData: false,
      contentType: false,
      async: true,
      success: function (response) {
        // console.log("response", response);
        $(".create-room")[0].reset();
        // localStorage.setItem("roomNo", JSON.stringify(response.response));
        swal("Success", "Room created successfully!", "success");
        return;
      },
      error: function (error) {
        console.log(error);
        swal("ERROR!", `${error.statusText}!`, "error");
        return;
      },
    });
  });

  //   join room
  $(".join-room").submit(function (e) {
    e.preventDefault();
    let roomno = $("#joinroom").val();

    if (!roomno) {
      swal("ERROR!", "Please fill all the required fields!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("roomno", roomno);

    const token = JSON.parse(localStorage.getItem("user")).authToken;

    // ajax api call
    $.ajax({
      url: "http://192.168.1.222:1111/api/Room/JoinRoom",
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: JSON.stringify({
        roomNo: roomno,
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: true,
      success: function (response) {
        console.log(response);
        $(".join-room")[0].reset();
        localStorage.setItem("roomNo", JSON.stringify(response.response));
        window.location.href = "chat-dashboard.html";
        // swal("Success", "Room joined successfully!", "success");
        return;
      },
      error: function (error) {
        swal(
          "ERROR!",
          `${
            error.responseJSON.message
              ? error.responseJSON.message
              : error.statusText
          }!`,
          "error"
        );
        return;
      },
    });
  });
});
