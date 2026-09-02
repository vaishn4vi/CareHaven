/* CareHaven — Blood donation centers directory with working city filter */
(function () {
  var CENTERS = {
    pune: [
      { name: "Chinchwad Blood Donation Center", address: "123, Chinchwad, Pune", phone: "+91 98765 43210" },
      { name: "Pimpri Blood Bank", address: "45, Pimpri Road, Pune", phone: "+91 91234 56789" }
    ],
    mumbai: [
      { name: "KEM Hospital Blood Bank", address: "Parel, Mumbai", phone: "+91 90000 11111" },
      { name: "Lions Blood Bank", address: "Andheri, Mumbai", phone: "+91 90000 22222" }
    ],
    bangalore: [
      { name: "XYZ Blood Donation Camp", address: "78, High Street, Bengaluru", phone: "+91 90987 65432" },
      { name: "Rotary Blood Bank", address: "Jayanagar, Bengaluru", phone: "+91 90000 33333" }
    ],
    chennai: [
      { name: "Government Blood Bank", address: "Egmore, Chennai", phone: "+91 90000 44444" },
      { name: "Voluntary Blood Bank", address: "T Nagar, Chennai", phone: "+91 90000 55555" }
    ],
    delhi: [
      { name: "Red Cross Blood Bank", address: "Connaught Place, Delhi", phone: "+91 90000 66666" },
      { name: "AIIMS Blood Bank", address: "Ansari Nagar, Delhi", phone: "+91 90000 77777" }
    ],
    kolkata: [
      { name: "Bengal Blood Bank", address: "Salt Lake, Kolkata", phone: "+91 90000 88888" }
    ],
    hyderabad: [
      { name: "City Blood Bank", address: "Somajiguda, Hyderabad", phone: "+91 90000 99999" }
    ]
  };

  function $(id) { return document.getElementById(id); }

  function render(city) {
    var list = CENTERS[city] || [];
    var wrap = $("centersList");
    if (!list.length) {
      wrap.innerHTML = '<div class="ch-empty-state" style="grid-column:1/-1;"><div class="ch-empty-icon">🩸</div><p>No listings for this city yet.</p></div>';
      return;
    }
    wrap.innerHTML = list.map(function (c) {
      return '<div class="ch-card">' +
        "<h3 style=\"font-size:1.05rem;\">" + c.name + "</h3>" +
        '<p class="ch-muted" style="font-size:0.85rem;">' + c.address + "</p>" +
        '<p style="font-size:0.85rem;">' + c.phone + "</p>" +
        "</div>";
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    render($("citySelect").value);
    $("citySelect").addEventListener("change", function () { render(this.value); });
  });
})();
