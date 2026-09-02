/* CareHaven — Book Appointment (reads doctors registered via Doctor Registration) */
(function () {
  var DOCTORS_KEY = "ch_doctors";
  var APPTS_KEY = "ch_appointments";

  var DEMO_DOCTORS = [
    { id: "demo_1", name: "Anjali Rao", specialization: "General Physician", city: "Chennai" },
    { id: "demo_2", name: "Karthik Iyer", specialization: "Cardiologist", city: "Chennai" },
    { id: "demo_3", name: "Priya Menon", specialization: "Dermatologist", city: "Bengaluru" },
    { id: "demo_4", name: "Sameer Shah", specialization: "Pediatrician", city: "Mumbai" }
  ];

  var PACKAGES = [
    { id: "pkg_cardio", name: "Cardiology Health Check (Package)" },
    { id: "pkg_diabetes", name: "Diabetes Screening (Package)" },
    { id: "pkg_cancer", name: "Cancer Screening (Package)" }
  ];

  function $(id) { return document.getElementById(id); }
  function getDoctors() { try { return JSON.parse(localStorage.getItem(DOCTORS_KEY)) || []; } catch (e) { return []; } }
  function getAppts() { try { return JSON.parse(localStorage.getItem(APPTS_KEY)) || []; } catch (e) { return []; } }
  function saveAppts(list) { localStorage.setItem(APPTS_KEY, JSON.stringify(list)); }

  function setError(input, show) {
    var wrap = input.closest(".ch-field");
    var err = wrap && wrap.querySelector(".ch-error-text");
    input.classList.toggle("invalid", !!show);
    if (err) err.classList.toggle("show", !!show);
  }

  function populateOptions() {
    var select = $("doctorSelect");
    var registered = getDoctors();
    var all = registered.concat(DEMO_DOCTORS);
    var html = '<option value="" disabled selected>Select…</option>';
    if (all.length) {
      html += "<optgroup label=\"Doctors\">" + all.map(function (d) {
        return '<option value="doc:' + d.id + '">Dr. ' + d.name + " — " + d.specialization + "</option>";
      }).join("") + "</optgroup>";
    }
    html += "<optgroup label=\"Packages\">" + PACKAGES.map(function (p) {
      return '<option value="pkg:' + p.id + '">' + p.name + "</option>";
    }).join("") + "</optgroup>";
    select.innerHTML = html;
  }

  function labelFor(value) {
    if (value.indexOf("doc:") === 0) {
      var id = value.slice(4);
      var all = getDoctors().concat(DEMO_DOCTORS);
      var doc = all.filter(function (d) { return d.id === id; })[0];
      return doc ? "Dr. " + doc.name + " (" + doc.specialization + ")" : "Doctor";
    }
    var pkgId = value.slice(4);
    var pkg = PACKAGES.filter(function (p) { return p.id === pkgId; })[0];
    return pkg ? pkg.name : "Package";
  }

  function renderAppts() {
    var appts = getAppts();
    var empty = $("apptEmpty");
    var list = $("apptList");
    if (!appts.length) { empty.style.display = "block"; list.innerHTML = ""; return; }
    empty.style.display = "none";
    list.innerHTML = appts.slice().reverse().map(function (a, i) {
      var realIdx = appts.length - 1 - i;
      return '<div class="ch-card" style="margin-bottom:10px; padding:14px;">' +
        '<div class="ch-flex" style="justify-content:space-between;">' +
        "<strong>" + a.withLabel + "</strong>" +
        '<button class="ch-btn ch-btn-sm ch-btn-ghost" data-cancel="' + realIdx + '">Cancel</button></div>' +
        '<p class="ch-muted" style="font-size:0.85rem; margin:6px 0 0;">' + a.date + " at " + a.time + " · for " + a.patientName + "</p>" +
        (a.reason ? '<p style="font-size:0.85rem; margin:4px 0 0;">' + a.reason.replace(/[<>]/g, "") + "</p>" : "") +
        "</div>";
    }).join("");

    list.querySelectorAll("[data-cancel]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-cancel"), 10);
        var updated = getAppts();
        updated.splice(i, 1);
        saveAppts(updated);
        renderAppts();
        window.chToast && window.chToast("Appointment cancelled", "info");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    populateOptions();
    renderAppts();

    // Default date to today
    var dateInput = $("apptDate");
    dateInput.min = new Date().toISOString().slice(0, 10);

    $("apptForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("patientName");
      var doctor = $("doctorSelect");
      var date = $("apptDate");
      var time = $("apptTime");

      var valid = true;
      setError(name, !name.value.trim()); if (!name.value.trim()) valid = false;
      setError(doctor, !doctor.value); if (!doctor.value) valid = false;
      var dateOk = date.value && date.value >= dateInput.min;
      setError(date, !dateOk); if (!dateOk) valid = false;
      setError(time, !time.value); if (!time.value) valid = false;

      if (!valid) {
        window.chToast && window.chToast("Please fix the highlighted fields", "error");
        return;
      }

      var appts = getAppts();
      appts.push({
        id: "appt_" + Date.now(),
        patientName: name.value.trim(),
        withLabel: labelFor(doctor.value),
        date: date.value,
        time: time.value,
        reason: $("reason").value.trim()
      });
      saveAppts(appts);
      this.reset();
      renderAppts();
      window.chToast && window.chToast("Appointment confirmed!", "success");
    });
  });
})();
