// Client facing scripts here
$(document).ready(function () {
  $("#resources-container").on("click", ".save-button", function (event) {
    event.preventDefault();
    const resourceId = event.target.dataset.id;
    $.ajax({
      url: "/remove-resource",
      method: "DELETE",
      data: { resourceId },
    }).then(function () {});
  });

  // $("#save-post").click(function () {
  //   alert("Handler for .click() called.");
  // });

  $(".create-resource").on("click", ".save-button", function (event) {
    event.preventDefault();
    const resourceId = event.target.dataset.id;
    alert(resourceId);
    $.ajax({
      url: `/resources/save/${resourceId}`,
      method: "POST",
      data: { resourceId },
    }).then(function (data) {
      console.log(data);
    });
  });
});
