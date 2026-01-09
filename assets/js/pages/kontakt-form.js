document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Danke für Ihre Anfrage! Wir melden uns so schnell wie möglich.");
    contactForm.reset();
  });
});
