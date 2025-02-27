var url =
  window.location != window.parent.location
    ? document.referrer
    : document.location.href;
if (url.includes("kongregate")) {
  $.ajax({
    url: "https://cdn1.kongregate.com/javascripts/kongregate_api.js",
    dataType: "script",
    success: function () {
      kongregateAPI.loadAPI(function () {
        window.kongregate = kongregateAPI.getAPI();
        let username = window.kongregate.services._username;
        if (username && username !== "" && username !== "Guest") {
          animal = username;
        }
      });
    },
  });
}

function submitScore(id, value) {
  if (window.kongregate) {
    window.kongregate.stats.submit(id, value);
  } else {
    console.log("no kong API!");
  }
}
