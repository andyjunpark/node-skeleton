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
});
