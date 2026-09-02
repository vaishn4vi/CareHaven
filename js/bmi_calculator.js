/* CareHaven — BMI Calculator with persistent history */
(function () {
  var STORAGE_KEY = "ch_bmi_history";

  function $(id) { return document.getElementById(id); }

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveHistory(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

  function category(bmi) {
    if (bmi < 18.5) return { label: "Underweight", cls: "ch-badge-warn", color: "#e0a419" };
    if (bmi < 25) return { label: "Normal weight", cls: "ch-badge-good", color: "#2fa365" };
    if (bmi < 30) return { label: "Overweight", cls: "ch-badge-warn", color: "#e0a419" };
    return { label: "Obese", cls: "ch-badge-bad", color: "#d94f4f" };
  }

  function renderHistory() {
    var list = getHistory();
    var empty = $("historyEmpty");
    var table = $("historyTable");
    var body = $("historyBody");
    if (!list.length) {
      empty.style.display = "block";
      table.style.display = "none";
      return;
    }
    empty.style.display = "none";
    table.style.display = "table";
    body.innerHTML = list.slice().reverse().map(function (entry, idx) {
      var realIdx = list.length - 1 - idx;
      var cat = category(entry.bmi);
      return "<tr><td>" + entry.date + "</td><td>" + entry.bmi.toFixed(1) + "</td>" +
        '<td><span class="ch-badge ' + cat.cls + '">' + cat.label + "</span></td>" +
        '<td><button class="ch-btn ch-btn-sm ch-btn-ghost" data-remove="' + realIdx + '">Remove</button></td></tr>';
    }).join("");

    body.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-remove"), 10);
        var updated = getHistory();
        updated.splice(i, 1);
        saveHistory(updated);
        renderHistory();
        window.chToast && window.chToast("Entry removed", "info");
      });
    });
  }

  function updateUnitFields() {
    var unit = $("unit").value;
    $("metric-fields").style.display = unit === "metric" ? "block" : "none";
    $("us-fields").style.display = unit === "us" ? "block" : "none";
  }

  function showError(msg) {
    var box = $("errorBox");
    if (!msg) { box.classList.remove("show"); box.textContent = ""; return; }
    box.textContent = msg;
    box.classList.add("show");
  }

  function calculate() {
    showError("");
    var unit = $("unit").value;
    var weight, heightM;

    if (unit === "metric") {
      weight = parseFloat($("weight-metric").value);
      heightM = parseFloat($("height-metric").value) / 100;
    } else {
      var weightLbs = parseFloat($("weight-us").value);
      var feet = parseFloat($("height-feet").value) || 0;
      var inches = parseFloat($("height-inches").value) || 0;
      heightM = (feet * 12 + inches) * 0.0254;
      weight = weightLbs * 0.453592;
    }

    var age = parseFloat($("age").value);

    if (!weight || weight <= 0 || !heightM || heightM <= 0) {
      showError("Please enter a valid weight and height.");
      return;
    }
    if (!age || age <= 0 || age > 120) {
      showError("Please enter a valid age.");
      return;
    }

    var bmi = weight / (heightM * heightM);
    var cat = category(bmi);

    $("resultWrap").style.display = "block";
    $("bmiResult").textContent = "Your BMI is " + bmi.toFixed(1);
    var badge = $("bmiBadge");
    badge.textContent = cat.label;
    badge.className = "ch-badge " + cat.cls;

    var pct = Math.max(0, Math.min(100, ((bmi - 15) / (40 - 15)) * 100));
    var bar = $("bmiBar");
    bar.style.width = pct + "%";
    bar.style.background = cat.color;

    var advice = "";
    if (bmi < 18.5) {
      var toGain = (18.5 * heightM * heightM) - weight;
      advice = "To reach the typical 'normal' range, you'd need to gain roughly " + toGain.toFixed(1) + " kg. Consider speaking with a doctor or dietitian about a healthy way to do that.";
    } else if (bmi < 25) {
      advice = "This falls in the typical 'normal' range. Keep up whatever's been working for you.";
    } else {
      var toLose = weight - (24.9 * heightM * heightM);
      advice = "To reach the typical 'normal' range, you'd need to lose roughly " + toLose.toFixed(1) + " kg. Gradual, sustainable changes tend to work best — consider talking to a doctor or dietitian.";
    }
    advice += " Remember BMI doesn't account for muscle mass, bone density or body composition — it's a screening tool, not a diagnosis.";
    $("weightAdjustment").textContent = advice;

    var history = getHistory();
    history.push({ date: new Date().toLocaleDateString(), bmi: bmi, weightKg: weight, heightM: heightM });
    saveHistory(history);
    renderHistory();
    window.chToast && window.chToast("BMI calculated and saved to your history", "success");
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateUnitFields();
    $("unit").addEventListener("change", updateUnitFields);
    $("calcBtn").addEventListener("click", calculate);
    $("clearHistoryBtn").addEventListener("click", function () {
      if (confirm("Clear all saved BMI history on this device?")) {
        saveHistory([]);
        renderHistory();
        window.chToast && window.chToast("History cleared", "info");
      }
    });
    renderHistory();
  });
})();
