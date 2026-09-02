/* CareHaven — Mental Health: mood journal + breathing exercise (all data stays on-device) */
(function () {
  var KEY = "ch_mood_log";
  var MOOD_EMOJI = { 5: "😄", 4: "🙂", 3: "😐", 2: "😔", 1: "😢" };
  var MOOD_LABEL = { 5: "Great", 4: "Good", 3: "Okay", 2: "Low", 1: "Struggling" };
  var selectedMood = null;

  function $(id) { return document.getElementById(id); }
  function getLog() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function saveLog(list) { localStorage.setItem(KEY, JSON.stringify(list)); }

  function renderMoodList() {
    var log = getLog();
    var empty = $("moodEmpty");
    var list = $("moodList");
    if (!log.length) { empty.style.display = "block"; list.innerHTML = ""; return; }
    empty.style.display = "none";
    list.innerHTML = log.slice().reverse().slice(0, 10).map(function (entry, i) {
      var realIdx = log.length - 1 - i;
      return '<div class="ch-card" style="margin-bottom:10px; padding:14px;">' +
        '<div class="ch-flex" style="justify-content:space-between;">' +
        "<span>" + MOOD_EMOJI[entry.mood] + " <strong>" + MOOD_LABEL[entry.mood] + "</strong> <span class=\"ch-muted\" style=\"font-size:0.78rem;\">" + entry.date + "</span></span>" +
        '<button class="ch-btn ch-btn-sm ch-btn-ghost" data-del="' + realIdx + '">Delete</button></div>' +
        (entry.note ? '<p style="margin:8px 0 0; font-size:0.88rem;">' + entry.note.replace(/[<>]/g, "") + "</p>" : "") +
        "</div>";
    }).join("");

    list.querySelectorAll("[data-del]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-del"), 10);
        var updated = getLog();
        updated.splice(i, 1);
        saveLog(updated);
        renderMoodList();
      });
    });
  }

  function initMoodPicker() {
    var buttons = document.querySelectorAll("#moodPicker [data-mood]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.style.background = "var(--ch-surface-alt)"; });
        btn.style.background = "var(--ch-primary-light)";
        selectedMood = btn.getAttribute("data-mood");
      });
    });

    $("saveMoodBtn").addEventListener("click", function () {
      if (!selectedMood) {
        window.chToast && window.chToast("Pick how you're feeling first", "error");
        return;
      }
      var log = getLog();
      log.push({ mood: selectedMood, note: $("moodNote").value.trim(), date: new Date().toLocaleString() });
      saveLog(log);
      $("moodNote").value = "";
      selectedMood = null;
      buttons.forEach(function (b) { b.style.background = "var(--ch-surface-alt)"; });
      renderMoodList();
      window.chToast && window.chToast("Check-in saved", "success");
    });
  }

  function initBreathing() {
    var circle = $("breathCircle");
    var btn = $("breathBtn");
    var running = false;
    var phase = 0; // 0 in, 1 hold, 2 out, 3 hold
    var phases = [
      { label: "Breathe in…", scale: "scale(1.35)" },
      { label: "Hold…", scale: "scale(1.35)" },
      { label: "Breathe out…", scale: "scale(1)" },
      { label: "Hold…", scale: "scale(1)" }
    ];
    var interval = null;

    function step() {
      var p = phases[phase % 4];
      circle.textContent = p.label;
      circle.style.transform = p.scale;
      phase++;
    }

    btn.addEventListener("click", function () {
      if (running) {
        running = false;
        clearInterval(interval);
        circle.textContent = "Start";
        circle.style.transform = "scale(1)";
        btn.textContent = "Begin Exercise";
        return;
      }
      running = true;
      btn.textContent = "Stop";
      phase = 0;
      step();
      interval = setInterval(step, 4000);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderMoodList();
    initMoodPicker();
    initBreathing();
  });
})();
