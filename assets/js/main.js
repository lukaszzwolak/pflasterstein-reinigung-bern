window.PFLASTERPRO_INIT = function () {
  // YEAR IN FOOTER
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // smooth scroll helper
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

  // SCROLL BUTTONS
  const scrollUpBtn = document.getElementById("scroll-up");
  const scrollDownBtn = document.getElementById("scroll-down");

  if (scrollUpBtn) scrollUpBtn.addEventListener("click", () => smoothScrollTo(0, 600));
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      const doc = document.documentElement;
      const bottom = doc.scrollHeight - window.innerHeight;
      smoothScrollTo(bottom, 600);
    });
  }

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = a.getAttribute("href");
      const id = target.substring(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      smoothScrollTo(top, 600);
    });
  });
};
