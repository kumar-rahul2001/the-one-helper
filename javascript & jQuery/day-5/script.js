$(document).ready(function () {
  loadProfiles();

  $("#profileForm").submit(function (e) {
    e.preventDefault();
    let name = $("#name").val().trim();
    let bio = $("#bio").val().trim();
    let profilePic = $("#profilePic").val().trim();

    if (!name || !bio || !profilePic) {
      alert("All fields are required!");
      return;
    }

    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    profiles.push({ id: Date.now(), name, bio, profilePic, likes: 0 });
    localStorage.setItem("profiles", JSON.stringify(profiles));

    $("#profileForm")[0].reset();
    loadProfiles();
  });

  function loadProfiles() {
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    $("#profiles").empty();
    profiles.forEach((profile) => {
      $("#profiles").append(`
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${profile.profilePic}" class="card-img-top" alt="Profile Picture">
                        <div class="card-body">
                            <h5 class="card-title editable" data-id="${profile.id}">${profile.name}</h5>
                            <p class="card-text bio" data-id="${profile.id}">${profile.bio}</p>
                            <button class="btn btn-info toggle-bio" data-id="${profile.id}">Toggle Bio</button>
                            <button class="btn btn-danger delete-profile" data-id="${profile.id}">Delete</button>
                            <button class="btn btn-primary edit-profile" data-id="${profile.id}">Edit</button>
                            <button class="btn btn-warning like-profile" data-id="${profile.id}">❤ <span>${profile.likes}</span></button>
                        </div>
                    </div>
                </div>
            `);
    });
  }

  $(document).on("click", ".delete-profile", function () {
    let id = $(this).data("id");
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    profiles = profiles.filter((profile) => profile.id !== id);
    localStorage.setItem("profiles", JSON.stringify(profiles));
    loadProfiles();
  });

  $(document).on("click", ".edit-profile", function () {
    let id = $(this).data("id");
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    let profile = profiles.find((profile) => profile.id === id);
    if (profile) {
      $("#name").val(profile.name);
      $("#bio").val(profile.bio);
      $("#profilePic").val(profile.profilePic);
      profiles = profiles.filter((profile) => profile.id !== id);
      localStorage.setItem("profiles", JSON.stringify(profiles));
      loadProfiles();
    }
  });

  $(document).on("click", ".toggle-bio", function () {
    let id = $(this).data("id");
    $(`.bio[data-id='${id}']`).toggle();
  });

  $(document).on("click", ".like-profile", function () {
    let id = $(this).data("id");
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    let profile = profiles.find((profile) => profile.id === id);
    if (profile) {
      profile.likes++;
      localStorage.setItem("profiles", JSON.stringify(profiles));
      loadProfiles();
    }
  });

  $("#toggleTheme").click(function () {
    $("body").toggleClass("dark-theme");
    $(this).text(
      $(this).text() === "Switch to Dark Mode 🌙"
        ? "Switch to Light Mode ☀"
        : "Switch to Dark Mode 🌙"
    );
  });
});
