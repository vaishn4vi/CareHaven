/* CareHaven — Water Tracker */
(function () {
  var LOG_KEY = "ch_water_log";       // { "YYYY-MM-DD": ml }
  var GOAL_KEY = "ch_water_goal_ml";
  var GLASS_ML = 250;
  var reminderTimer = null;

  function $(id) { return document.getElementById(id); }
  function todayKey() { return new Date().toISOString().slice(0, 10); }

  function getLog() { try { return JSON.parse(localStorage.getItem(LOG_KEY)) || {}; } catch (e) { return {}; } }
  function saveLog(log) { localStorage.setItem(LOG_KEY, JSON.stringify(log)); }
  function getGoal() { return parseInt(localStorage.getItem(GOAL_KEY), 10) || 2000; }
  function setGoal(ml) { localStorage.setItem(GOAL_KEY, String(ml)); }

  function computeStreak(log, goal) {
    var streak = 0;
    var d = new Date();
    while (true) {
      var key = d.toISOString().slice(0, 10);
      if ((log[key] || 0) >= goal) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  function renderCups(drunkMl, goalMl) {
    var glassCount = Math.max(8, Math.ceil(goalMl / GLASS_ML));
    var filled = Math.floor(drunkMl / GLASS_ML);
    var wrap = $("cupsWrap");
    wrap.innerHTML = "";
    for (var i = 0; i < glassCount; i++) {
      var cup = document.createElement("div");
      cup.style.cssText = "width:34px;height:44px;border-radius:0 0 8px 8px;border:2px solid var(--ch-primary);position:relative;overflow:hidden;background:var(--ch-surface-alt);cursor:default;";
      if (i < filled) {
        cup.style.background = "var(--ch-primary)";
      }
      wrap.appendChild(cup);
    }
  }

  function render() {
    var log = getLog();
    var goal = getGoal();
    var drunk = log[todayKey()] || 0;
    var pct = Math.min(100, (drunk / goal) * 100);

    $("goalLabel").textContent = "Goal: " + (goal / 1000).toFixed(1) + " L";
    $("litersDrunk").textContent = (drunk / 1000).toFixed(2);
    $("litersGoal").textContent = (goal / 1000).toFixed(1);

    var bar = $("waterBar");
    bar.style.width = pct + "%";
    bar.style.background = pct >= 100 ? "var(--ch-success)" : "var(--ch-primary)";
    bar.textContent = pct > 8 ? Math.round(pct) + "%" : "";

    $("successMessage").style.display = drunk >= goal ? "block" : "none";
    $("streakText").textContent = computeStreak(log, goal) + "-day streak";

    renderCups(drunk, goal);
  }

  function addGlass() {
    var log = getLog();
    var key = todayKey();
    var goal = getGoal();
    var before = log[key] || 0;
    log[key] = before + GLASS_ML;
    saveLog(log);
    render();
    if (before < goal && log[key] >= goal) {
      window.chToast && window.chToast("Nice! You reached today's water goal 🎉", "success");
    } else {
      window.chToast && window.chToast("Logged " + GLASS_ML + " ml", "info");
    }
  }

  function resetToday() {
    var log = getLog();
    delete log[todayKey()];
    saveLog(log);
    render();
    window.chToast && window.chToast("Today's log cleared", "info");
  }

  function calcGoal() {
    var age = parseFloat($("age").value);
    var weight = parseFloat($("weight").value);
    var gender = $("gender").value;
    var activity = $("activity").value;

    if (!weight || weight <= 0) {
      window.chToast && window.chToast("Enter a valid weight to personalize your goal", "error");
      return;
    }

    var mlPerKg = 33;
    if (activity === "high") mlPerKg += 6;
    else if (activity === "low") mlPerKg -= 3;

    var goal = Math.round(weight * mlPerKg);
    goal = Math.max(1200, Math.min(5000, goal));
    setGoal(goal);
    render();

    var advice = "Your personalized goal is about " + (goal / 1000).toFixed(1) + " liters a day, based on your weight and activity level.";
    if (age && age < 18) advice += " As a minor, make sure a parent/guardian or doctor is aware of any specific hydration needs.";
    if (gender === "male") advice += " Men's fluid needs tend to run slightly higher on average.";
    $("personalizedAdvice").textContent = advice;
    window.chToast && window.chToast("Goal updated", "success");
  }

  function updateReminderButtons(active) {
    $("setReminderBtn").style.display = active ? "none" : "inline-flex";
    $("stopReminderBtn").style.display = active ? "inline-flex" : "none";
  }

  function startReminders() {
    var minutes = parseInt($("reminderInterval").value, 10);
    var status = $("reminderStatus");

    function schedule() {
      if (reminderTimer) clearInterval(reminderTimer);
      reminderTimer = setInterval(function () {
        var log = getLog();
        var goal = getGoal();
        var drunk = log[todayKey()] || 0;
        if (drunk < goal) {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("CareHaven — Hydration reminder", { body: "Time for a glass of water!" });
          } else {
            window.chToast && window.chToast("💧 Reminder: time for a glass of water!", "info");
          }
        }
      }, minutes * 60 * 1000);
    }

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then(function (perm) {
        status.textContent = perm === "granted"
          ? "Browser notifications enabled. We'll remind you every " + minutes + " minutes while this tab stays open."
          : "Notifications weren't enabled — you'll still get in-app reminders while this tab is open.";
      });
    } else {
      status.textContent = "Reminders active every " + minutes + " minutes while this tab stays open.";
    }
    schedule();
    updateReminderButtons(true);
    window.chToast && window.chToast("Reminders started", "success");
  }

  function stopReminders() {
    if (reminderTimer) clearInterval(reminderTimer);
    reminderTimer = null;
    updateReminderButtons(false);
    $("reminderStatus").textContent = "Reminders stopped.";
    window.chToast && window.chToast("Reminders stopped", "info");
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    $("addGlassBtn").addEventListener("click", addGlass);
    $("resetTodayBtn").addEventListener("click", resetToday);
    $("calcGoalBtn").addEventListener("click", calcGoal);
    $("setReminderBtn").addEventListener("click", startReminders);
    $("stopReminderBtn").addEventListener("click", stopReminders);
  });
})();
