$(document).ready(function () {
  // redirect to login when user is not login.
  // const token = JSON.parse(localStorage.getItem("user"))?.authToken;
  // if (!token) {
  //   window.location.href = "login.html";
  // }

  // get all rooms
  getAllRooms();
  function getAllRooms() {
    $.ajax({
      url: "http://192.168.1.222:1111/api/Room/GetAllRooms",
      method: "GET",
      headers: { Authorization: "Bearer " + token },
      async: true,
      success: function (response) {
        // console.log("response", response);
        const rooms = response;
        // rendering rooms
        $(".chat-list-container").empty();
        rooms.forEach((room) => {
          $(".chat-list-container")
            .prepend(`<div class="d-flex align-items-center p-2 chat-user" data-id="${room.roomId}" data-room-no="${room.roomNo}" >
            <span class="user-profile">
              <img src="http://192.168.1.222:1111/${room.roomProfile}" alt="${room.roomName}"
            /></span>
            <div class="flex-grow-1 ps-2 user-details">
              <h4 class="user-name">${room.roomName}</h4>
              <p class="user-details">${room.roomNo}</p>
            </div>
          </div>`);
        });

        return;
      },
      error: function (error) {
        console.log(error);
        swal("ERROR!", `${error.statusText}!`, "error");
        return;
      },
    });
  }

  // get the room id from the rooms
  let roomId = 100;
  let roomNo = "A3ZLKH";
  $(document).on("click", ".chat-user", function () {
    // $(".chat-user").click(function(){
    roomId = $(this).data("id");
    roomNo = $(this).data("room-no");
    localStorage.setItem("roomId", JSON.stringify(roomId));
    getRoomDetails(roomNo);
    getAllChats(roomId);
  });

  // get room Details
  function getRoomDetails(roomNo) {
    $.ajax({
      url: `http://192.168.1.222:1111/api/Room/GetRoomDetails?RoomNo=${roomNo}`,
      method: "GET",
      headers: { Authorization: "Bearer " + token },
      async: true,
      success: function (response) {
        // console.log("Room Details", response);
        const room = response;
        $(".currentUser").text(room.roomName);
        $(".current-user-pic").attr(
          "src",
          `http://192.168.1.222:1111/${room.roomProfile}`
        );

        return;
      },
      error: function (error) {
        console.log(error);
        swal("ERROR!", "Error in getting all chats", "error");
        return;
      },
    });
  }
  getRoomDetails(roomNo);

  // get all chat of the room
  function getAllChats(roomId) {
    $.ajax({
      url: `http://192.168.1.222:1111/api/Chat/GetAllChat?RoomId=${roomId}`,
      method: "GET",
      headers: { Authorization: "Bearer " + token },
      async: true,
      success: function (response) {
        const allChats = response;
        $(".chat-body").empty();
        allChats.forEach((chat) => {
          $(".chat-body").prepend(` <div class="d-flex align-items-start mb-3">
            <div
              style="
                overflow: hidden;
                height: 50px;
                width: 50px;
                border-radius: 5px;
                flex-shrink: 0;
              "
            >
              <img
                src="http://192.168.1.222:1111/${chat.senderProfile}"
                alt="profile-pic"
                height="50"
                width="50"
              />
            </div>
            <div class="ps-2 flex-grow-1">
              <p class="mb-0"><b>${chat.senderName}</b></p>
              <p class="mb-0">${chat.chat}</p>
            </div>
          </div>`);
        });

        return;
      },
      error: function (error) {
        console.log(error);
        swal("ERROR!", "Error in getting all chats", "error");
        return;
      },
    });
  }
  getAllChats(roomId);

  // send chat
  $("#send-chat").click(function () {
    const roomId = localStorage.getItem("roomId") || 100;
    console.log(roomId);
    let chat = $("#chat").val();

    // send chat
    $.ajax({
      url: "http://192.168.1.222:1111/api/Chat/SendChat",
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      data: JSON.stringify({
        roomId,
        chat,
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: true,
      success: function (response) {
        console.log("response", response);
        getAllChats(roomId);
        $("#chat").val("");
        return;
      },
      error: function (error) {
        console.log(error);
        swal("ERROR!", `${error.statusText}!`, "error");
        return;
      },
    });
  });

  // logout user
  $("#logout").click(function () {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  // sidebar toggler function
  $(".sidbar-toggle").click(function () {
    $(".left-side").hide();
  });
});
