// ================== ROK W STOPCE ==================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ================== PŁYNNE, PRAWIE LINIOWE PRZEWIJANIE ==================

function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1); // 0–1

    // ruch liniowy – stała prędkość
    const eased = t;

    window.scrollTo(0, startY + distance * eased);

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// przewijanie do sekcji (używane też w HTML: onclick="scrollToSection('contact')")
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  smoothScrollTo(top, 600);
}

// Smooth scroll dla linków w nawigacjach
const navLinks = document.querySelectorAll(
  '.main-nav a[href^="#"], .header-nav a[href^="#"]'
);

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    scrollToSection(targetId);
  });
});

// ================== PRZYCISKI SCROLL-UP / SCROLL-DOWN ==================

const scrollUpBtn = document.getElementById("scroll-up");
const scrollDownBtn = document.getElementById("scroll-down");

if (scrollUpBtn) {
  scrollUpBtn.addEventListener("click", () => {
    smoothScrollTo(0, 600);
  });
}

if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", () => {
    const doc = document.documentElement;
    const bottom = doc.scrollHeight - window.innerHeight;
    smoothScrollTo(bottom, 600);
  });
}

// ================== KALKULATOR WYCENY ==================

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

    let pricePerM2 = 6; // podstawowa Hochdruckreinigung

    if (serviceType === "deep") {
      pricePerM2 = 7.5;
    } else if (serviceType === "full") {
      pricePerM2 = 9;
    }

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

// ================== FORMULARZ KONTAKTOWY (FAKE WYSYŁKA) ==================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Danke für Ihre Anfrage! Wir melden uns so schnell wie möglich.");

    contactForm.reset();
  });
}
