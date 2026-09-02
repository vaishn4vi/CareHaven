/* CareHaven — Hospital finder. Uses a small curated dataset (no external API key required). */
(function () {
  var HOSPITALS = [
    { name: "Apollo Hospital", city: "Chennai", vicinity: "Greams Road, Chennai", rating: 4.3, lat: 13.0565, lng: 80.2670 },
    { name: "Fortis Malar Hospital", city: "Chennai", vicinity: "Adyar, Chennai", rating: 4.2, lat: 13.0081, lng: 80.2601 },
    { name: "MIOT International", city: "Chennai", vicinity: "Manapakkam, Chennai", rating: 4.5, lat: 12.9894, lng: 80.1984 },
    { name: "Sri Ramachandra Medical Centre", city: "Chennai", vicinity: "Porur, Chennai", rating: 4.1, lat: 13.0396, lng: 80.1831 },
    { name: "Government General Hospital", city: "Chennai", vicinity: "Park Town, Chennai", rating: 3.8, lat: 13.0789, lng: 80.2785 },
    { name: "Kokilaben Dhirubhai Ambani Hospital", city: "Mumbai", vicinity: "Andheri West, Mumbai", rating: 4.4, lat: 19.1305, lng: 72.8267 },
    { name: "Lilavati Hospital", city: "Mumbai", vicinity: "Bandra West, Mumbai", rating: 4.2, lat: 19.0509, lng: 72.8295 },
    { name: "Tata Memorial Hospital", city: "Mumbai", vicinity: "Parel, Mumbai", rating: 4.5, lat: 19.0022, lng: 72.8425 },
    { name: "AIIMS Delhi", city: "Delhi", vicinity: "Ansari Nagar, New Delhi", rating: 4.4, lat: 28.5672, lng: 77.2100 },
    { name: "Fortis Escorts Heart Institute", city: "Delhi", vicinity: "Okhla Road, New Delhi", rating: 4.3, lat: 28.5580, lng: 77.2733 },
    { name: "Manipal Hospital", city: "Bengaluru", vicinity: "Old Airport Road, Bengaluru", rating: 4.3, lat: 12.9584, lng: 77.6483 },
    { name: "Narayana Health City", city: "Bengaluru", vicinity: "Bommasandra, Bengaluru", rating: 4.4, lat: 12.8060, lng: 77.6980 },
    { name: "Apollo Gleneagles Hospital", city: "Kolkata", vicinity: "Kadapara, Kolkata", rating: 4.1, lat: 22.5665, lng: 88.4084 },
    { name: "AMRI Hospitals", city: "Kolkata", vicinity: "Salt Lake, Kolkata", rating: 4.0, lat: 22.5726, lng: 88.4157 },
    { name: "Yashoda Hospitals", city: "Hyderabad", vicinity: "Somajiguda, Hyderabad", rating: 4.3, lat: 17.4172, lng: 78.4522 },
    { name: "Continental Hospitals", city: "Hyderabad", vicinity: "Gachibowli, Hyderabad", rating: 4.4, lat: 17.4123, lng: 78.3487 }
  ];

  function $(id) { return document.getElementById(id); }

  function haversine(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function render(list, opts) {
    opts = opts || {};
    var wrap = $("hospitalsList");
    if (!list.length) {
      wrap.innerHTML = '<div class="ch-empty-state" style="grid-column:1/-1;"><div class="ch-empty-icon">🏥</div><p>No hospitals found. Try a different city, or use your location.</p></div>';
      return;
    }
    wrap.innerHTML = list.map(function (h) {
      var distLine = (opts.showDistance && typeof h._dist === "number")
        ? '<p class="ch-muted" style="font-size:0.8rem;">' + h._dist.toFixed(1) + " km away</p>" : "";
      return '<div class="ch-card">' +
        "<h3 style=\"font-size:1.05rem;\">" + h.name + "</h3>" +
        '<p class="ch-muted" style="font-size:0.85rem;">' + h.vicinity + "</p>" +
        distLine +
        '<span class="ch-badge ch-badge-good">★ ' + h.rating + "</span>" +
        '<a class="ch-btn ch-btn-sm ch-btn-outline ch-mt-lg" style="display:inline-flex;" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + h.lat + "," + h.lng + '">View on Map</a>' +
        "</div>";
    }).join("");
  }

  function searchCity(query) {
    query = query.trim().toLowerCase();
    if (!query) { render(HOSPITALS); return; }
    var matches = HOSPITALS.filter(function (h) {
      return h.city.toLowerCase().indexOf(query) !== -1 || h.name.toLowerCase().indexOf(query) !== -1;
    });
    render(matches);
  }

  function useLocation() {
    var status = $("locStatus");
    if (!navigator.geolocation) {
      status.textContent = "Geolocation isn't supported in this browser — showing all hospitals instead.";
      render(HOSPITALS);
      return;
    }
    status.textContent = "Locating you…";
    navigator.geolocation.getCurrentPosition(function (pos) {
      var lat = pos.coords.latitude, lng = pos.coords.longitude;
      var withDist = HOSPITALS.map(function (h) {
        return Object.assign({}, h, { _dist: haversine(lat, lng, h.lat, h.lng) });
      }).sort(function (a, b) { return a._dist - b._dist; });
      status.textContent = "Showing hospitals sorted by distance from your location.";
      render(withDist.slice(0, 9), { showDistance: true });
    }, function () {
      status.textContent = "Couldn't access your location — showing all hospitals instead.";
      render(HOSPITALS);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    render(HOSPITALS);
    $("searchBtn").addEventListener("click", function () { searchCity($("citySearch").value); });
    $("citySearch").addEventListener("keydown", function (e) { if (e.key === "Enter") searchCity(this.value); });
    $("useLocationBtn").addEventListener("click", useLocation);
  });
})();
