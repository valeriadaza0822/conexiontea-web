 // auth.js — inicio de sesión y registro (demo con localStorage)
// Usuarios de demostración: se guardan en localStorage como "ctea-users"

function getUsers() {
  try { return JSON.parse(localStorage.getItem("ctea-users") || "[]"); }
  catch (e) { return []; }
}
function saveUsers(users) {
  try { localStorage.setItem("ctea-users", JSON.stringify(users)); } catch (e) { }
}
function setCurrent(user) {
  try { localStorage.setItem("ctea-user", JSON.stringify(user)); } catch (e) { }
}

function showMsg(text, ok = true) {
  const el = document.getElementById("formMessage");
  if (!el) return;
  el.textContent = text;
  el.style.color = ok ? "#2d927f" : "#c0392b";
}

// ---- Registro ----
const registroForm = document.getElementById("registroForm");
if (registroForm) {
  registroForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    if (!name || !email || password.length < 6 || !role) {
      showMsg("Completa todos los campos, el rol y usa una contraseña de al menos 6 caracteres.", false);
      return;
    }
    const users = getUsers();
    if (users.some(u => u.email === email)) {
      showMsg("Ya existe una cuenta con ese correo. Inicia sesión.", false);
      return;
    }
    const user = { name, email, password, role };
    users.push(user);
    saveUsers(users);
    setCurrent(user);
    showMsg("✓ Cuenta creada. Redirigiendo a tu panel…");
    setTimeout(() => location.href = "dashboard.html", 700);
  });
}

// ---- Login ----
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrent(user);
      showMsg("✓ Sesión iniciada. Redirigiendo a tu panel…");
      setTimeout(() => location.href = "dashboard.html", 700);
    } else {
      showMsg("Correo o contraseña incorrectos. Crea una cuenta si es tu primera vez.", false);
    }
  });
}
