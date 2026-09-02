/* CareHaven — Personal Health Records manager */
(function () {
  var KEY = "ch_reports";
  var MAX_BYTES = 2 * 1024 * 1024;

  function $(id) { return document.getElementById(id); }
  function getReports() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function saveReports(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      window.chToast && window.chToast("Storage is full — try removing an attachment or an old record.", "error");
      return false;
    }
  }

  function render(filter) {
    var reports = getReports();
    if (filter) {
      var f = filter.toLowerCase();
      reports = reports.filter(function (r) {
        return (r.title + " " + r.type + " " + r.notes).toLowerCase().indexOf(f) !== -1;
      });
    }
    var empty = $("reportsEmpty");
    var list = $("reportsList");
    if (!reports.length) { empty.style.display = "block"; list.innerHTML = ""; return; }
    empty.style.display = "none";

    var all = getReports();
    list.innerHTML = reports.slice().reverse().map(function (r) {
      var realIdx = all.indexOf(r);
      return '<div class="ch-card" style="margin-bottom:10px; padding:14px;">' +
        '<div class="ch-flex" style="justify-content:space-between;">' +
        "<strong>" + r.title + "</strong>" +
        '<button class="ch-btn ch-btn-sm ch-btn-ghost" data-del="' + realIdx + '">Delete</button></div>' +
        '<p class="ch-muted" style="font-size:0.8rem; margin:4px 0 0;">' + r.type + " · " + r.date + "</p>" +
        (r.notes ? '<p style="font-size:0.85rem; margin:6px 0 0;">' + r.notes.replace(/[<>]/g, "") + "</p>" : "") +
        (r.file ? '<a href="' + r.file.data + '" download="' + r.file.name + '" class="ch-btn ch-btn-sm ch-btn-outline ch-mt-lg">Download ' + r.file.name + "</a>" : "") +
        "</div>";
    }).join("");

    list.querySelectorAll("[data-del]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-del"), 10);
        var updated = getReports();
        updated.splice(i, 1);
        saveReports(updated);
        render($("searchRecords").value);
        window.chToast && window.chToast("Record deleted", "info");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    $("searchRecords").addEventListener("input", function () { render(this.value); });

    $("reportForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var title = $("title");
      var date = $("date");
      var valid = true;
      [title, date].forEach(function (el) {
        var ok = !!el.value.trim();
        el.classList.toggle("invalid", !ok);
        var err = el.closest(".ch-field").querySelector(".ch-error-text");
        if (err) err.classList.toggle("show", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        window.chToast && window.chToast("Please fill in the required fields", "error");
        return;
      }

      var record = {
        id: "rep_" + Date.now(),
        title: title.value.trim(),
        type: $("type").value,
        date: date.value,
        notes: $("notes").value.trim(),
        file: null
      };

      var fileInput = $("fileInput");
      var file = fileInput.files && fileInput.files[0];

      function finish() {
        var reports = getReports();
        reports.push(record);
        if (saveReports(reports)) {
          this && this.reset && this.reset();
          document.getElementById("reportForm").reset();
          render($("searchRecords").value);
          window.chToast && window.chToast("Record saved", "success");
        }
      }

      if (file) {
        if (file.size > MAX_BYTES) {
          window.chToast && window.chToast("File is too large (max 2 MB)", "error");
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          record.file = { name: file.name, data: reader.result };
          finish();
        };
        reader.onerror = function () {
          window.chToast && window.chToast("Couldn't read that file", "error");
        };
        reader.readAsDataURL(file);
      } else {
        finish();
      }
    });
  });
})();
