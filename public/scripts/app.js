// Client facing scripts here
const renderResources = function(resources){
  for (let resource of resources) {
    const $item = createResourceElement(resource);
    $("#resource-container").prepend($item);
  }
};

const createResourceElement = function(data) {
  const $resource = $(`<article class="create-resource">
  <div class="card" style="width: 40rem;">
    <div class="card-body">
      <h5 class="card-title" id="topic">${data.resource.name}</h5>
      <h3 class="title">${resource.title}</h3>
      <p>${data.resource.description} </p>
      <a href="${data.resource.url}" target="_blank">${data.resource.url}</a>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-around">
          <a id="like-button"><i class="far fa-thumbs-up"></i> Like  ${data.resource.like_amount}  </a>
          <a id="save-button"><i class="far fa-star"></i> Save</a>
        </li>
        <li class="list-group-item">
          <label for="customRange1" class="form-label">Rating: ${resource.rating} </label>
          <input type="range" class="form-range" id="customRange1" min="0" max="5">
          <button class="btn btn-primary float-right" type="submit" value="clear" onclick="">Submit</button>
        </li>
      </ul>
      <div class="card-footer text-muted">
        <textarea name="content" id="content" placeholder="Write a comment"></textarea>
      <h5>${resource.comment}  </h5>
      <p>by ${resource.user_name}</p>
      <p class="card-text"><small class="text-muted">Last updated 1 mins ago</small></p>
    </div>
  </div>
</article>`);
return $resource;
}
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

  //adding new resources
  $("#create-form").on("submit", function(data) {
    const $data = $(this).serialize();
      $.ajax({
      method: "POST",
      url: "/resources",
      data: $data
    })
    .done((res) => {
      console.log("RESPONSE", res);
    });
    $.post("/", $data)
      .then(() => {
        $(".create-resource").val("");

        loadTweets();
      });
  });
  })
  function loadResources() {
    $.get("/resources")
      .then((data) => {
        renderResources(data);
      });

      loadResources();

  }
