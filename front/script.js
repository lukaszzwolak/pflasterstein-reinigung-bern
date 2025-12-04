// Ustaw aktualny rok w stopce
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Płynne przewijanie do sekcji (używane w przycisku i nawigacji)
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// Jeśli klikniesz linki w nav, też możemy zrobić smooth scroll (opcjonalnie)
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    scrollToSection(targetId);
  });
});

// 🔢 Kalkulator wyceny
const calcForm = document.getElementById("calc-form");
const calcResult = document.getElementById("calc-result");

if (calcForm && calcResult) {
  calcForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const areaInput = document.getElementById("area");
    const serviceSelect = document.getElementById("service-type");
    const impregnationCheckbox = document.getElementById("impregnation");

    const area = parseFloat(areaInput.value);
    const serviceType = serviceSelect.value;
    const impregnation = impregnationCheckbox.checked;

    if (isNaN(area) || area <= 0) {
      calcResult.textContent = "Bitte geben Sie eine gültige Fläche in m² ein.";
      return;
    }

    // Bazowa stawka orientacyjna (do modyfikacji w przyszłości)
    let pricePerM2 = 6; // podstawowa Hochdruckreinigung

    if (serviceType === "deep") {
      pricePerM2 = 7.5; // + Moos/Algen
    } else if (serviceType === "full") {
      pricePerM2 = 9; // full pakiet
    }

    // Dodatkowa opcja impregnacji
    if (impregnation) {
      pricePerM2 += 1.5;
    }

    const estimated = area * pricePerM2;

    calcResult.textContent =
      `Ungefähre Kosten: ca. ${estimated.toFixed(2)} CHF ` +
      `(ca. ${pricePerM2.toFixed(2)} CHF/m²). ` +
      "Dies ist nur eine Schätzung – die endgültige Offerte erhalten Sie nach Ihrer Anfrage.";
  });
}

// ✉️ Proste „udawane” wysłanie formularza kontaktowego
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Tu w przyszłości podepniemy prawdziwą wysyłkę (Formspree / backend)
    alert("Danke für Ihre Anfrage! Wir melden uns so schnell wie möglich.");

    contactForm.reset();
  });
}
