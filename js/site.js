/* ==========================================================================
   CareHaven — Shared site chrome (header, footer, theme, search, i18n, toast)
   Every page sets `window.CH_BASE` (e.g. "" for root, "../" for sub-websites)
   and `window.CH_PAGE` (the current page's url key) before loading this file.
   ========================================================================== */
(function () {
  var BASE = window.CH_BASE || "";
  var CURRENT = window.CH_PAGE || "";

  var PAGES = [
    { key: "home", title: "Home", url: BASE + "index.html", keywords: "home dashboard start", primary: true },
    { key: "dashboard", title: "My Dashboard", url: BASE + "sub-websites/dashboard.html", keywords: "dashboard overview my health summary", primary: true },
    { key: "hospitals", title: "Hospitals Around Me", url: BASE + "sub-websites/hospitals.html", keywords: "hospitals emergency nearby clinic", primary: true },
    { key: "book_appointment", title: "Book Appointment", url: BASE + "sub-websites/book_appointment.html", keywords: "book appointment doctor visit schedule", primary: true },
    { key: "bmi", title: "BMI Calculator", url: BASE + "sub-websites/bmi_calculator.html", keywords: "bmi weight height body mass index calculator", primary: true },
    { key: "water", title: "Water Tracker", url: BASE + "sub-websites/water_tracker.html", keywords: "water tracker hydration reminder drink", primary: true },
    { key: "mental_health", title: "Mental Health", url: BASE + "sub-websites/mental_health.html", keywords: "mental health mood journal therapy wellbeing stress", primary: true },
    { key: "diet", title: "Diet Plans", url: BASE + "sub-websites/diet_plans.html", keywords: "diet plan nutrition meal food calories" },
    { key: "medicines", title: "Medicines Info", url: BASE + "sub-websites/medicines_info.html", keywords: "medicine drug composition allergy side effects" },
    { key: "checkups", title: "Health Checkups", url: BASE + "sub-websites/health_checkups.html", keywords: "checkup package full body diabetes heart screening" },
    { key: "women_health", title: "Women's Health", url: BASE + "sub-websites/women_health.html", keywords: "women health periods pregnancy articles" },
    { key: "blood", title: "Blood Centers", url: BASE + "sub-websites/blood_centers.html", keywords: "blood donation center donor" },
    { key: "videos", title: "Video Tutorials", url: BASE + "sub-websites/video_tutorials.html", keywords: "video tutorial exercise workout" },
    { key: "reports", title: "Personal Health Records", url: BASE + "sub-websites/personal_reports.html", keywords: "personal reports records phr medical history documents" },
    { key: "doctor_reg", title: "Doctor Registration", url: BASE + "sub-websites/doctor_registration.html", keywords: "doctor registration join network professional" },
    { key: "about", title: "About Us", url: BASE + "sub-websites/about_us.html", keywords: "about us contact team" }
  ];

  var I18N = {
    english: { home: "Home", dashboard: "My Dashboard", hospitals: "Hospitals", book_appointment: "Book Appointment", bmi: "BMI Calculator", water: "Water Tracker", mental_health: "Mental Health", about: "About Us", search_ph: "Search CareHaven…", more: "More" },
    "हिन्दी": { home: "होम", dashboard: "मेरा डैशबोर्ड", hospitals: "अस्पताल", book_appointment: "अपॉइंटमेंट बुक करें", bmi: "बीएमआई कैलकुलेटर", water: "पानी ट्रैकर", mental_health: "मानसिक स्वास्थ्य", about: "हमारे बारे में", search_ph: "CareHaven में खोजें…", more: "अधिक" },
    "తెలుగు": { home: "హోమ్", dashboard: "నా డాష్‌బోర్డ్", hospitals: "ఆసుపత్రులు", book_appointment: "అపాయింట్‌మెంట్ బుక్ చేయండి", bmi: "బీఎంఐ కాలిక్యులేటర్", water: "వాటర్ ట్రాకర్", mental_health: "మానసిక ఆరోగ్యం", about: "మా గురించి", search_ph: "CareHaven లో వెతకండి…", more: "మరిన్ని" },
    "தமிழ்": { home: "முகப்பு", dashboard: "எனது டாஷ்போர்டு", hospitals: "மருத்துவமனைகள்", book_appointment: "சந்திப்பு பதிவு", bmi: "BMI கால்குலேட்டர்", water: "தண்ணீர் டிராக்கர்", mental_health: "மனநலம்", about: "எங்களை பற்றி", search_ph: "CareHaven தேடு…", more: "மேலும்" },
    deutsch: { home: "Start", dashboard: "Mein Dashboard", hospitals: "Krankenhäuser", book_appointment: "Termin buchen", bmi: "BMI-Rechner", water: "Wasser-Tracker", mental_health: "Psychische Gesundheit", about: "Über uns", search_ph: "CareHaven durchsuchen…", more: "Mehr" }
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------- Header ---------------- */
  function buildHeader() {
    var primary = PAGES.filter(function (p) { return p.primary; });
    var navLinks = primary.map(function (p) {
      var active = p.key === CURRENT ? " active" : "";
      return '<li><a href="' + p.url + '" data-i18n-key="' + p.key + '" class="' + active.trim() + '">' + esc(p.title) + "</a></li>";
    }).join("");

    var header = document.createElement("header");
    header.className = "ch-header";
    header.innerHTML =
      '<div class="ch-header-inner">' +
      '<button class="ch-nav-toggle" id="ch-nav-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>' +
      '<a class="ch-logo" href="' + BASE + 'index.html">' +
      '<img src="' + BASE + 'images/logo.png" alt="" onerror="this.style.display=\'none\'">' +
      "CareHaven</a>" +
      '<nav class="ch-nav" id="ch-nav" aria-label="Primary"><ul>' + navLinks + "</ul></nav>" +
      '<div class="ch-header-actions">' +
      '<div class="ch-search" id="ch-search-wrap">' +
      '<input type="text" id="ch-search-input" placeholder="Search CareHaven…" autocomplete="off" aria-label="Search CareHaven">' +
      '<div class="ch-search-results" id="ch-search-results"></div>' +
      "</div>" +
      '<select class="ch-lang" id="ch-lang-select" aria-label="Language">' +
      '<option value="english">EN</option><option value="हिन्दी">हिन्दी</option><option value="తెలుగు">తెలుగు</option><option value="தமிழ்">தமிழ்</option><option value="deutsch">DE</option>' +
      "</select>" +
      '<button class="ch-icon-btn" id="ch-theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">🌙</button>' +
      "</div>" +
      "</div>";
    document.body.insertBefore(header, document.body.firstChild);

    var skip = document.createElement("a");
    skip.href = "#ch-main";
    skip.className = "ch-skip-link";
    skip.textContent = "Skip to content";
    document.body.insertBefore(skip, document.body.firstChild);

    // Nav toggle
    var toggle = document.getElementById("ch-nav-toggle");
    var nav = document.getElementById("ch-nav");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });

    // Search
    var input = document.getElementById("ch-search-input");
    var results = document.getElementById("ch-search-results");
    function renderResults(q) {
      q = q.trim().toLowerCase();
      if (!q) { results.classList.remove("open"); results.innerHTML = ""; return; }
      var matches = PAGES.filter(function (p) {
        return (p.title + " " + p.keywords).toLowerCase().indexOf(q) !== -1;
      }).slice(0, 6);
      if (!matches.length) {
        results.innerHTML = '<div class="ch-search-empty">No matches for "' + esc(q) + '"</div>';
      } else {
        results.innerHTML = matches.map(function (p) {
          return '<a href="' + p.url + '">' + esc(p.title) + "</a>";
        }).join("");
      }
      results.classList.add("open");
    }
    input.addEventListener("input", function () { renderResults(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = results.querySelector("a");
        if (first) window.location.href = first.getAttribute("href");
      }
    });
    document.addEventListener("click", function (e) {
      if (!document.getElementById("ch-search-wrap").contains(e.target)) {
        results.classList.remove("open");
      }
    });

    // Theme toggle
    var themeBtn = document.getElementById("ch-theme-toggle");
    function applyTheme(t) {
      document.documentElement.setAttribute("data-theme", t);
      themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
    }
    var savedTheme = localStorage.getItem("ch_theme") || "light";
    applyTheme(savedTheme);
    themeBtn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("ch_theme", next);
      applyTheme(next);
    });

    // Language
    var langSelect = document.getElementById("ch-lang-select");
    var savedLang = localStorage.getItem("ch_lang") || "english";
    langSelect.value = savedLang;
    applyLang(savedLang);
    langSelect.addEventListener("change", function () {
      localStorage.setItem("ch_lang", langSelect.value);
      applyLang(langSelect.value);
    });

    function applyLang(lang) {
      var dict = I18N[lang] || I18N.english;
      document.querySelectorAll("[data-i18n-key]").forEach(function (el) {
        var key = el.getAttribute("data-i18n-key");
        if (dict[key]) el.textContent = dict[key];
      });
      input.placeholder = dict.search_ph || I18N.english.search_ph;
    }
  }

  /* ---------------- Footer ---------------- */
  function buildFooter() {
    var explore = PAGES.slice(0, 8).map(function (p) {
      return '<li><a href="' + p.url + '">' + esc(p.title) + "</a></li>";
    }).join("");
    var more = PAGES.slice(8).map(function (p) {
      return '<li><a href="' + p.url + '">' + esc(p.title) + "</a></li>";
    }).join("");

    var footer = document.createElement("footer");
    footer.className = "ch-footer";
    footer.innerHTML =
      '<div class="ch-footer-grid">' +
      "<div>" +
      '<div class="ch-logo" style="margin-bottom:10px;">CareHaven</div>' +
      '<p class="ch-muted" style="font-size:0.88rem;max-width:280px;">Your all-in-one companion for everyday health — trackers, records, appointments and trustworthy information in one place.</p>' +
      '<div class="ch-emergency ch-mt-lg"><strong>Emergency?</strong> Call <strong>112</strong> (all-purpose) or <strong>108</strong> (ambulance, India). If you or someone else is in immediate danger, contact local emergency services now.</div>' +
      "</div>" +
      '<div><h4>Explore</h4><ul>' + explore + "</ul></div>" +
      '<div><h4>More</h4><ul>' + more + "</ul></div>" +
      '<div><h4>Contact</h4><ul>' +
      '<li class="ch-muted">support@carehaven.example</li>' +
      '<li class="ch-muted">+1 (555) 123-4567</li>' +
      '<li class="ch-muted">123 Care Haven Lane, Health City</li>' +
      "</ul></div>" +
      "</div>" +
      '<div class="ch-footer-bottom">&copy; ' + new Date().getFullYear() + " CareHaven. This site provides general wellness information and is not a substitute for professional medical advice.</div>";
    document.body.appendChild(footer);
  }

  /* ---------------- Toast ---------------- */
  function buildToastHost() {
    var host = document.createElement("div");
    host.id = "ch-toast-container";
    document.body.appendChild(host);
  }
  window.chToast = function (message, type) {
    var host = document.getElementById("ch-toast-container");
    if (!host) { buildToastHost(); host = document.getElementById("ch-toast-container"); }
    var el = document.createElement("div");
    el.className = "ch-toast " + (type || "info");
    el.textContent = message;
    host.appendChild(el);
    setTimeout(function () {
      el.style.transition = "opacity .3s ease";
      el.style.opacity = "0";
      setTimeout(function () { el.remove(); }, 300);
    }, 3200);
  };

  /* ---------------- Init ---------------- */
  function init() {
    // Apply saved theme ASAP to avoid flash, in case not yet applied
    document.documentElement.setAttribute("data-theme", localStorage.getItem("ch_theme") || "light");
    buildHeader();
    buildFooter();
    buildToastHost();

    // Wrap existing body content (everything except header/footer we just added) in a main landmark for skip-link
    // Only do this once — mark first non-header/footer sibling group.
    var main = document.getElementById("ch-main");
    if (!main) {
      var body = document.body;
      var header = document.querySelector(".ch-header");
      var footer = document.querySelector(".ch-footer");
      var mainEl = document.createElement("main");
      mainEl.id = "ch-main";
      var node = header.nextSibling;
      while (node && node !== footer) {
        var next = node.nextSibling;
        if (node !== footer) mainEl.appendChild(node);
        node = next;
      }
      body.insertBefore(mainEl, footer);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.CH_PAGES = PAGES;
})();
