// Client facing scripts here
function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/register",
    data
  });
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/login",
    data
  });
}
