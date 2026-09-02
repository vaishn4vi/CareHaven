/* CareHaven — Exercise video finder. Links out to YouTube search (no API key required/exposed). */
(function () {
  var CATEGORIES = [
    { label: "Beginner Yoga", icon: "🧘", query: "beginner yoga full routine" },
    { label: "HIIT Workout", icon: "🔥", query: "20 minute HIIT workout" },
    { label: "Strength Training", icon: "🏋️", query: "beginner strength training full body" },
    { label: "Cardio", icon: "🏃", query: "cardio workout no equipment" },
    { label: "Stretching", icon: "🤸", query: "full body stretching routine" },
    { label: "Ab Workout", icon: "💪", query: "ab workout for beginners" },
    { label: "Pilates", icon: "🧎", query: "beginner pilates workout" },
    { label: "Desk Stretches", icon: "🪑", query: "desk stretches for office workers" }
  ];

  function ytSearchUrl(q) {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q + " exercise");
  }

  function $(id) { return document.getElementById(id); }

  document.addEventListener("DOMContentLoaded", function () {
    var grid = $("categoryGrid");
    grid.innerHTML = CATEGORIES.map(function (c) {
      return '<a class="ch-card ch-center" style="text-decoration:none;" target="_blank" rel="noopener" href="' + ytSearchUrl(c.query) + '">' +
        '<div style="font-size:1.8rem;">' + c.icon + "</div>" +
        "<h4 style=\"margin-top:8px;\">" + c.label + "</h4>" +
        "</a>";
    }).join("");

    function doSearch() {
      var q = $("videoSearch").value.trim();
      if (!q) { window.chToast && window.chToast("Type something to search for", "error"); return; }
      window.open(ytSearchUrl(q), "_blank", "noopener");
    }
    $("videoSearchBtn").addEventListener("click", doSearch);
    $("videoSearch").addEventListener("keydown", function (e) { if (e.key === "Enter") doSearch(); });
  });
})();
