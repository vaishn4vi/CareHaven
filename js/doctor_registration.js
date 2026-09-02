/* CareHaven — Doctor registration (persisted to localStorage, read by Book Appointment) */
(function () {
  var KEY = "ch_doctors";

  function $(id) { return document.getElementById(id); }
  function getDoctors() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function saveDoctors(list) { localStorage.setItem(KEY, JSON.stringify(list)); }

  function setError(input, show) {
    var wrap = input.closest(".ch-field");
    var err = wrap && wrap.querySelector(".ch-error-text");
    input.classList.toggle("invalid", !!show);
    if (err) err.classList.toggle("show", !!show);
  }

  function validate() {
    var ok = true;
    var fields = ["name", "qualification", "specialization", "experience", "registrationNumber", "phone", "email", "city"];
    fields.forEach(function (id) {
      var el = $(id);
      var valid = el.value.trim().length > 0;
      if (id === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      if (id === "phone") valid = /^[0-9+\-\s()]{7,}$/.test(el.value.trim());
      if (id === "experience") valid = el.value !== "" && Number(el.value) >= 0;
      setError(el, !valid);
      if (!valid) ok = false;
    });
    return ok;
  }

  function render() {
    var doctors = getDoctors();
    $("doctorCount").textContent = doctors.length;
    var empty = $("doctorsEmpty");
    var list = $("doctorsList");
    if (!doctors.length) { empty.style.display = "block"; list.innerHTML = ""; return; }
    empty.style.display = "none";
    list.innerHTML = doctors.slice().reverse().map(function (d, i) {
      var realIdx = doctors.length - 1 - i;
      return '<div class="ch-card" style="margin-bottom:10px; padding:14px;">' +
        '<div class="ch-flex" style="justify-content:space-between;">' +
        "<strong>Dr. " + d.name + "</strong>" +
        '<button class="ch-btn ch-btn-sm ch-btn-ghost" data-remove="' + realIdx + '">Remove</button></div>' +
        '<p class="ch-muted" style="font-size:0.85rem; margin:6px 0 0;">' + d.specialization + " · " + d.experience + " yrs experience · " + d.city + "</p>" +
        "</div>";
    }).join("");

    list.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-remove"), 10);
        var updated = getDoctors();
        updated.splice(i, 1);
        saveDoctors(updated);
        render();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    $("doctorForm").addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        window.chToast && window.chToast("Please fix the highlighted fields", "error");
        return;
      }
      var doctor = {
        id: "doc_" + Date.now(),
        name: $("name").value.trim(),
        qualification: $("qualification").value.trim(),
        specialization: $("specialization").value,
        experience: Number($("experience").value),
        registrationNumber: $("registrationNumber").value.trim(),
        phone: $("phone").value.trim(),
        email: $("email").value.trim(),
        city: $("city").value.trim()
      };
      var doctors = getDoctors();
      doctors.push(doctor);
      saveDoctors(doctors);
      this.reset();
      render();
      window.chToast && window.chToast("Registration submitted — you're now listed for appointment booking", "success");
    });
  });
})();
