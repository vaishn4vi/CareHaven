/* CareHaven — My Dashboard: aggregates data saved by other tools (all on-device via localStorage) */
(function () {
  function $(id) { return document.getElementById(id); }
  function get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function todayKey() { return new Date().toISOString().slice(0, 10); }

  function computeStreak(log, goal) {
    var streak = 0;
    var d = new Date();
    while (true) {
      var key = d.toISOString().slice(0, 10);
      if ((log[key] || 0) >= goal) { streak++; d.setDate(d.getDate() - 1); } else break;
    }
    return streak;
  }

  document.addEventListener("DOMContentLoaded", function () {
    // BMI
    var bmiHistory = get("ch_bmi_history", []);
    if (bmiHistory.length) {
      var last = bmiHistory[bmiHistory.length - 1];
      $("dashBmi").textContent = last.bmi.toFixed(1);
      var trend = bmiHistory.slice(-5).map(function (e) { return e.bmi.toFixed(1); }).join(" → ");
      $("bmiTrend").textContent = "Last " + Math.min(5, bmiHistory.length) + " entries: " + trend;
    } else {
      $("dashBmi").textContent = "No data";
    }

    // Water
    var waterLog = get("ch_water_log", {});
    var goal = parseInt(localStorage.getItem("ch_water_goal_ml"), 10) || 2000;
    var todayMl = waterLog[todayKey()] || 0;
    $("dashWater").textContent = (todayMl / 1000).toFixed(1) + " / " + (goal / 1000).toFixed(1) + " L";
    $("dashStreak").textContent = computeStreak(waterLog, goal) + " days";

    // Mood
    var moodLog = get("ch_mood_log", []);
    var moodEmoji = { 5: "😄 Great", 4: "🙂 Good", 3: "😐 Okay", 2: "😔 Low", 1: "😢 Struggling" };
    if (moodLog.length) {
      var lastMood = moodLog[moodLog.length - 1];
      $("dashMood").textContent = moodEmoji[lastMood.mood] || "—";
    } else {
      $("dashMood").textContent = "No check-ins";
    }

    // Reports
    var reports = get("ch_reports", []);
    $("dashReports").textContent = reports.length + (reports.length === 1 ? " record" : " records");

    // Appointments
    var appts = get("ch_appointments", []).slice().sort(function (a, b) {
      return (a.date + a.time).localeCompare(b.date + b.time);
    });
    var upcoming = appts.filter(function (a) { return a.date >= todayKey(); });
    if (upcoming.length) {
      $("dashApptsEmpty").style.display = "none";
      $("dashAppts").innerHTML = upcoming.slice(0, 4).map(function (a) {
        return '<div class="ch-card" style="padding:12px; margin-bottom:8px; background:var(--ch-surface-alt);">' +
          "<strong>" + a.withLabel + "</strong>" +
          '<p class="ch-muted" style="font-size:0.82rem; margin:4px 0 0;">' + a.date + " at " + a.time + "</p></div>";
      }).join("");
    }
  });
})();
