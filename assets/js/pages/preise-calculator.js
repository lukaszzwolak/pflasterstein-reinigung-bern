document.addEventListener("DOMContentLoaded", () => {
  const calcForm = document.getElementById("calc-form");
  const calcResult = document.getElementById("calc-result");
  if (!calcForm || !calcResult) return;

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
});
