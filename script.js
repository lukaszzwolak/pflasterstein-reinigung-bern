// ================== YEAR IN FOOTER ==================
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ================== SMOOTH SCROLL (only for hash links) ==================
function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * t);
    if (t < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - 90;
  smoothScrollTo(top, 600);
}

// Smooth scroll only for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = a.getAttribute("href");
    const id = target.substring(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    scrollToSection(id);
  });
});

// ================== SCROLL BUTTONS ==================
const scrollUpBtn = document.getElementById("scroll-up");
const scrollDownBtn = document.getElementById("scroll-down");

if (scrollUpBtn) {
  scrollUpBtn.addEventListener("click", () => smoothScrollTo(0, 600));
}

if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", () => {
    const doc = document.documentElement;
    const bottom = doc.scrollHeight - window.innerHeight;
    smoothScrollTo(bottom, 600);
  });
}

// ================== PRICE CALCULATOR (only if exists) ==================
const calcForm = document.getElementById("calc-form");
const calcResult = document.getElementById("calc-result");

if (calcForm && calcResult) {
  calcForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const areaEl = document.getElementById("area");
    const serviceEl = document.getElementById("service-type");
    const imprEl = document.getElementById("impregnation");

    if (!areaEl || !serviceEl || !imprEl) return;

    const area = parseFloat(areaEl.value);
    const serviceType = serviceEl.value;
    const impregnation = imprEl.checked;

    if (isNaN(area) || area <= 0) {
      calcResult.textContent = "Bitte geben Sie eine gültige Fläche ein.";
      return;
    }

    let pricePerM2 = 6;
    if (serviceType === "deep") pricePerM2 = 7.5;
    if (serviceType === "full") pricePerM2 = 9;
    if (impregnation) pricePerM2 += 1.5;

    const estimated = area * pricePerM2;

    calcResult.textContent =
      `Ungefähre Kosten: ca. ${estimated.toFixed(2)} CHF ` +
      `(ca. ${pricePerM2.toFixed(2)} CHF/m²).`;
  });
}

// ================== CONTACT FORM (FAKE SEND) ==================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Danke für Ihre Anfrage! Wir melden uns so schnell wie möglich.");
    contactForm.reset();
  });
}
