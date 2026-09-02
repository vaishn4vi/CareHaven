/* CareHaven — Medicines info lookup (local reference data, informational only) */
(function () {
  var MEDICINES = [
    { name: "Paracetamol (Acetaminophen)", composition: "Paracetamol", uses: "Fever, mild to moderate pain relief", allergy: "Rare; overdose can seriously harm the liver — never exceed the labeled daily limit." },
    { name: "Ibuprofen", composition: "Ibuprofen (NSAID)", uses: "Pain, inflammation, fever", allergy: "Avoid if allergic to NSAIDs/aspirin, or with certain stomach, kidney or heart conditions — check with a doctor." },
    { name: "Aspirin", composition: "Acetylsalicylic acid", uses: "Pain relief, fever, low-dose for heart protection (as prescribed)", allergy: "Not for children with viral illness (Reye's syndrome risk); avoid if allergic to NSAIDs." },
    { name: "Amoxicillin", composition: "Amoxicillin (penicillin-class antibiotic)", uses: "Bacterial infections (as prescribed by a doctor)", allergy: "Avoid if allergic to penicillin; can cause rash, digestive upset." },
    { name: "Cetirizine", composition: "Cetirizine hydrochloride (antihistamine)", uses: "Allergies, hay fever, hives", allergy: "May cause drowsiness in some people." },
    { name: "Omeprazole", composition: "Omeprazole (proton pump inhibitor)", uses: "Acid reflux, heartburn, stomach ulcers", allergy: "Long-term use should be supervised by a doctor." },
    { name: "Metformin", composition: "Metformin hydrochloride", uses: "Type 2 diabetes management (prescription only)", allergy: "Avoid with certain kidney conditions; can cause digestive upset initially." },
    { name: "Loratadine", composition: "Loratadine (antihistamine)", uses: "Allergy symptoms, non-drowsy option", allergy: "Generally well tolerated; check interactions with other medicines." },
    { name: "Salbutamol (Albuterol) Inhaler", composition: "Salbutamol sulfate", uses: "Asthma and wheezing relief (prescription)", allergy: "Overuse can cause a fast heartbeat — follow prescribed dosing." },
    { name: "Vitamin D3 Supplement", composition: "Cholecalciferol", uses: "Vitamin D deficiency, bone health support", allergy: "High doses over time can cause toxicity — follow recommended amounts." }
  ];

  function $(id) { return document.getElementById(id); }

  function render(list) {
    var wrap = $("medResults");
    if (!list.length) {
      wrap.innerHTML = '<div class="ch-empty-state" style="grid-column:1/-1;"><div class="ch-empty-icon">💊</div><p>No matches. Try a different name, or ask your pharmacist.</p></div>';
      return;
    }
    wrap.innerHTML = list.map(function (m) {
      return '<div class="ch-card">' +
        "<h3 style=\"font-size:1.05rem;\">" + m.name + "</h3>" +
        '<p style="font-size:0.85rem;"><strong>Composition:</strong> ' + m.composition + "</p>" +
        '<p style="font-size:0.85rem;"><strong>Common uses:</strong> ' + m.uses + "</p>" +
        '<p style="font-size:0.85rem;"><strong>Allergy notes:</strong> ' + m.allergy + "</p>" +
        "</div>";
    }).join("");
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) { render(MEDICINES); return; }
    render(MEDICINES.filter(function (m) {
      return (m.name + " " + m.composition + " " + m.uses).toLowerCase().indexOf(q) !== -1;
    }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    render(MEDICINES);
    $("medSearchBtn").addEventListener("click", function () { search($("medSearch").value); });
    $("medSearch").addEventListener("keydown", function (e) { if (e.key === "Enter") search(this.value); });
  });
})();
