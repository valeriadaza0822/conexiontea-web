// script.js - codigo compartido por todas las paginas
const body = document.body;

document.querySelectorAll("[data-size]").forEach(btn => {
  btn.addEventListener("click", () => {
    body.classList.remove("font-small", "font-large");
    if (btn.dataset.size === "small") body.classList.add("font-small");
    if (btn.dataset.size === "large") body.classList.add("font-large");
    document.querySelectorAll("[data-size]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    try { localStorage.setItem("ctea-font", btn.dataset.size); } catch (e) {}
  });
});

document.querySelectorAll("[data-theme]").forEach(btn => {
  btn.addEventListener("click", () => {
    body.classList.remove("dark", "relaxed");
    if (btn.dataset.theme === "dark") body.classList.add("dark");
    if (btn.dataset.theme === "relaxed") body.classList.add("relaxed");
    document.querySelectorAll("[data-theme]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    try { localStorage.setItem("ctea-theme", btn.dataset.theme); } catch (e) {}
  });
});

document.getElementById("motionToggle")?.addEventListener("change", e => {
  body.classList.toggle("reduce-motion", e.target.checked);
  try { localStorage.setItem("ctea-motion", e.target.checked ? "reduced" : "normal"); } catch (err) {}
});

document.getElementById("langBtn")?.addEventListener("click", e => {
  const next = e.currentTarget.textContent.startsWith("ES") ? "EN⌄" : "ES⌄";
  e.currentTarget.textContent = next;
  e.currentTarget.setAttribute("aria-label", next.startsWith("ES") ? "Idioma español" : "English language");
});

try {
  const savedFont = localStorage.getItem("ctea-font");
  if (savedFont && savedFont !== "normal") {
    body.classList.add(savedFont === "small" ? "font-small" : "font-large");
    document.querySelectorAll("[data-size]").forEach(b =>
      b.classList.toggle("selected", b.dataset.size === savedFont));
  }

  const savedTheme = localStorage.getItem("ctea-theme");
  if (savedTheme && savedTheme !== "light") {
    body.classList.add(savedTheme === "dark" ? "dark" : "relaxed");
    document.querySelectorAll("[data-theme]").forEach(b =>
      b.classList.toggle("selected", b.dataset.theme === savedTheme));
  }

  const savedMotion = localStorage.getItem("ctea-motion");
  const motionToggle = document.getElementById("motionToggle");
  if (savedMotion === "reduced") {
    body.classList.add("reduce-motion");
    if (motionToggle) motionToggle.checked = true;
  }
} catch (e) {}
