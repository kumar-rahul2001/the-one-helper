$(document).ready(function () {
  loadProfiles();

  // from submission
  $(".profileForm").submit(function (e) {
    e.preventDefault();
    let username = $("#username").val().trim();
    let bio = $("#bio").val().trim();
    let profilePic = $("#profilePic")[0].files[0].name;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      console.log(base64String);
    };
    reader.readAsDataURL(profilePic);

    if (!username || !bio || !profilePic) {
      swal("OOPS!", "All fields are required!", "error");
      return;
    }

    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    profiles.push({ id: Date.now(), username, bio, profilePic });
    localStorage.setItem("profiles", JSON.stringify(profiles));

    $(".profileForm")[0].reset();
    loadProfiles();
    swal("Good Job!", "User added successfully!", "success");
    return;
  });

  function loadProfiles() {
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    $("#profiles").empty();
    profiles.forEach((profile) => {
      $("#profiles").append(`<div
          class="card col-lg-3 col-md-4 col-sm-6 col-12 align-items-center text-center p-3 profile-card" data-id="${profile.id}"
        >
          <!-- <div> -->
          <div class="overflow-hidden profile-pic">
            <img src="./assets/${profile.profilePic}" alt="profile-pic" />
          </div>
          <div>
            <h2 class="mt-3">${profile.username}</h2>
            <p>
             ${profile.bio}
            </p>  
          </div>
          <div>
            <button class="btn btn-success edit-profile" data-id="${profile.id}">Edit</button>
            <button class="btn btn-danger delete-profile" data-id="${profile.id}">Delete</button>
          </div>
          <!-- </div> -->
        </div>`);
    });
  }

  // delete profile
  $(document).on("click", ".delete-profile", function () {
    let id = $(this).data("id");
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    profiles = profiles.filter((profile) => profile.id !== id);
    localStorage.setItem("profiles", JSON.stringify(profiles));
    loadProfiles();
  });

  // edit profile
  $(document).on("click", ".edit-profile", function () {
    console.log(this);
    let id = $(this).data("id");
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    let profile = profiles.find((profile) => profile.id === id);
    if (profile) {
      $("#username").val(profile.username);
      $("#bio").val(profile.bio);
      $("#profilePic").val(profile.profilePic);
      profiles = profiles.filter((profile) => profile.id !== id);
      localStorage.setItem("profiles", JSON.stringify(profiles));
      loadProfiles();
    }
  });
});
