function computeBase() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const pagesIndex = segments.indexOf("pages");
  if (pagesIndex === -1) return "";
  const afterPagesCount = segments.length - (pagesIndex + 1);
  return "../".repeat(afterPagesCount);
}

async function loadPartial(targetId, url, base) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${url}: HTTP ${res.status}`);

  const html = await res.text();
  el.innerHTML = html.replaceAll("__BASE__", base);
}

function setActiveNav() {
  const path = window.location.pathname.toLowerCase();

  document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("active"));
  document.querySelectorAll(".dropdown-menu a").forEach((a) => a.classList.remove("active"));

  // Dienstleistung subpages
  if (path.includes("/pages/dienstleistungen/")) {
    const top = document.querySelector(`.nav-links a[data-nav="dienstleistungen"]`);
    if (top) top.classList.add("active");

    const file = path.split("/").pop();
    const subLink = document.querySelector(`.dropdown-menu a[href$="${file}"]`);
    if (subLink) subLink.classList.add("active");
    return;
  }

  const file = path.split("/").pop() || "index.html";
  const map = {
    "preise.html": "preise",
    "ueber-uns.html": "ueber-uns",
    "kontakt.html": "kontakt",
  };

  const key = map[file];
  if (!key) return;

  const active = document.querySelector(`.nav-links a[data-nav="${key}"]`);
  if (active) active.classList.add("active");
}

(async () => {
  const base = computeBase();
  try {
    await loadPartial("topbar-slot", `${base}partials/topbar.html`, base);
    await loadPartial("header-slot", `${base}partials/header.html`, base);
    await loadPartial("footer-slot", `${base}partials/footer.html`, base);

    setActiveNav();

    if (typeof window.PFLASTERPRO_INIT === "function") window.PFLASTERPRO_INIT();
  } catch (err) {
    console.error(err);
  }
})();
