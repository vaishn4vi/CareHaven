/* CareHaven — Women's health questionnaire (general information only, not a diagnosis) */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("healthForm");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var age = parseInt(document.getElementById("age").value, 10);
      var pregnant = document.getElementById("pregnant").value;
      var cycleDuration = document.getElementById("cycleDuration").value;
      var gapBetween = document.getElementById("gapBetween").value;
      var symptoms = document.getElementById("symptoms").value.trim();
      var conditions = document.getElementById("conditions").value.trim();
      var lifestyle = document.getElementById("lifestyle").value;

      var advice = "";

      if (age < 18) {
        advice += "As a young woman, staying hydrated and eating a balanced diet supports healthy development. Regular check-ups with a healthcare provider (alongside a parent or guardian) are valuable.\n\n";
      } else if (age < 40) {
        advice += "Regular exercise and paying attention to menstrual regularity are both worthwhile at this stage. If pregnant, consistent prenatal care matters for you and the baby.\n\n";
      } else {
        advice += "Regular screenings (such as mammograms and pelvic exams) and an overall healthy lifestyle can help manage menopause-related changes and reduce long-term health risks.\n\n";
      }

      if (pregnant === "yes") {
        advice += "Since you're pregnant: prenatal vitamins, and a diet rich in folic acid, iron and calcium are commonly recommended. Regular obstetrician visits help track your and your baby's health.\n\n";
      } else {
        advice += "Keeping up with routine gynecological exams is worthwhile, especially if anything feels different from your usual pattern.\n\n";
      }

      if (cycleDuration && gapBetween) {
        advice += "You mentioned a cycle length of " + cycleDuration + " days with roughly " + gapBetween + " days between periods. Regularity varies between people, but a marked or sudden change is worth mentioning to a doctor.\n\n";
      }

      if (lifestyle) {
        advice += "You described your lifestyle as \"" + lifestyle + "\". Consistent habits around diet, sleep and activity tend to support more stable cycles and energy levels.\n\n";
      }

      if (symptoms) {
        advice += "Symptoms you noted (" + symptoms + ") are worth discussing with a healthcare provider, especially if they're new, worsening, or affecting daily life.\n\n";
      }

      if (conditions) {
        advice += "You mentioned: " + conditions + ". Keep your provider updated on these so care recommendations stay relevant.\n\n";
      }

      var articles = "Related reading:\n";
      if (age < 18) {
        articles += "• Understanding Adolescent Menstrual Health\n• Nutrition Tips for Teen Girls\n";
      } else if (age < 40) {
        articles += "• Prenatal Care Basics\n• Managing PMS Symptoms\n";
      } else {
        articles += "• What to Expect With Menopause\n• Heart Health for Women Over 40\n";
      }
      if (pregnant === "yes") {
        articles += "• Healthy Eating During Pregnancy\n• Safe Exercise During Pregnancy\n";
      }

      document.getElementById("results").textContent = advice + "\n" + articles;
    });
  });
})();
