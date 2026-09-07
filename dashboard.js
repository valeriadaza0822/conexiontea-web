// dashboard.js - logica del panel del paciente (solo en dashboard.html)
const defaultMessage = ["Hola", "quiero", "jugar", "en la escuela"];

const pictograms = [
  { icon: "👋", text: "Hola" },
  { icon: "❤️", text: "quiero" },
  { icon: "⚽", text: "jugar" },
  { icon: "🏫", text: "en la escuela" },
  { icon: "🍎", text: "comer" },
  { icon: "💧", text: "agua" },
  { icon: "🎧", text: "descansar" },
  { icon: "😊", text: "estoy feliz" }
];

const activities = [
  { icon: "🎯", title: "Ejercicio de emociones", detail: "Reconocer emociones basicas" },
  { icon: "📖", title: "Lectura comprensiva", detail: "Leer y responder preguntas" },
  { icon: "🧩", title: "Ordenar pictogramas", detail: "Crear una frase visual" }
];

const routine = [
  ["07:00", "☀️", "Despertar"],
  ["07:30", "🍳", "Desayuno"],
  ["08:00", "🏃", "Ejercicio"],
  ["09:00", "🗣️", "Terapia"],
  ["12:30", "🍽️", "Almuerzo"],
  ["18:00", "📚", "Repaso tranquilo"]
];

const calendarEvents = {
  7: ["Terapia de lenguaje", "Actividad social"],
  12: ["Practicar pictogramas"],
  18: ["Revision con profesional"],
  24: ["Actividad familiar"]
};

let calendarDate = new Date();

const CHAT_INFO = {
  chatFamiliares: {
    icon: "👨‍👩‍👧",
    name: "Familiares",
    subtitle: "Apoyo cercano y cuidado diario",
    placeholder: "Escribe a tu familia...",
    welcome: "Hola, estamos aqui para acompañarte. ¿Como te sientes hoy?",
    quick: ["Estoy bien", "Necesito ayuda", "Te quiero"]
  },
  chatProfesional: {
    icon: "🩺",
    name: "Profesional",
    subtitle: "Seguimiento terapeutico y recomendaciones",
    placeholder: "Escribe a tu profesional...",
    welcome: "Hola. Puedes contarme como estuvo tu dia o que actividad quieres revisar.",
    quick: ["Tuve un avance", "Quiero practicar", "Tengo una duda"]
  },
  chatPares: {
    icon: "👫",
    name: "Pares",
    subtitle: "Amigos y compañeros",
    placeholder: "Escribe a tus amigos...",
    welcome: "¡Hola! Este espacio es para conversar con tus pares.",
    quick: ["¿Jugamos?", "Nos vemos luego", "Gracias"]
  }
};

const CHAT_CONTACTS = {
  chatFamiliares: [
    { id: "mama", icon: "👩", name: "Mamá", subtitle: "Cuidadora principal", welcome: "Hola, estoy pendiente de ti. ¿Como te sientes hoy?", quick: ["Estoy bien", "Necesito ayuda", "Te quiero"], replies: ["Gracias por contarme ❤️", "Estoy contigo.", "Lo hacemos paso a paso."] },
    { id: "papa", icon: "👨", name: "Papá", subtitle: "Apoyo en casa", welcome: "Hola. ¿Quieres contarme como va tu dia?", quick: ["Estoy tranquilo", "Quiero descansar", "Hablamos luego"], replies: ["Me alegra saber de ti.", "Respira con calma.", "Cuando quieras seguimos hablando."] },
    { id: "hermana", icon: "👧", name: "Hermana", subtitle: "Compañera de juegos", welcome: "¡Hola! ¿Quieres jugar o hablar un rato?", quick: ["¿Jugamos?", "Gracias", "Te extraño"], replies: ["¡Si! Pensemos un juego.", "Yo tambien.", "Me gusta hablar contigo."] }
  ],
  chatProfesional: [
    { id: "terapeuta", icon: "🩺", name: "Terapeuta Ana", subtitle: "Lenguaje y comunicacion", welcome: "Hola. Puedes contarme que frase quieres practicar.", quick: ["Quiero practicar", "Tuve un avance", "Tengo una duda"], replies: ["Muy bien, practiquemos juntos.", "Ese avance es importante.", "Lo revisamos en la sesion."] },
    { id: "psicologa", icon: "🧠", name: "Psicóloga Laura", subtitle: "Emociones y bienestar", welcome: "Hola. ¿Que emocion quieres expresar hoy?", quick: ["Estoy feliz", "Estoy nervioso", "Necesito calma"], replies: ["Gracias por decirlo.", "Vamos con calma.", "Puedes usar una pausa tranquila."] },
    { id: "docente", icon: "📚", name: "Docente Carlos", subtitle: "Acompañamiento escolar", welcome: "Hola. Este chat ayuda a organizar actividades escolares.", quick: ["Tengo tarea", "No entiendo", "Ya termine"], replies: ["Revisemos la actividad.", "Te explico de otra forma.", "Excelente trabajo."] }
  ],
  chatPares: [
    { id: "sofia", icon: "🙂", name: "Sofía", subtitle: "Amiga del colegio", welcome: "¡Hola! ¿Jugamos despues de clase?", quick: ["¿Jugamos?", "Nos vemos luego", "Gracias"], replies: ["¡Claro!", "Nos vemos pronto.", "De nada."] },
    { id: "mateo", icon: "⚽", name: "Mateo", subtitle: "Equipo de juego", welcome: "Hola. Podemos hablar de juegos o actividades.", quick: ["Fútbol", "Videojuego", "Hablamos mañana"], replies: ["Me gusta esa idea.", "¡Que divertido!", "Listo, mañana hablamos."] },
    { id: "valen", icon: "🎨", name: "Valen", subtitle: "Club creativo", welcome: "¡Hola! ¿Quieres compartir una idea?", quick: ["Dibujemos", "Tengo una idea", "Me gusta"], replies: ["Suena genial.", "Cuéntame mas.", "A mi tambien me gusta."] }
  ]
};

const panelData = {
  comunicacion: {
    title: "Comunicación",
    html: `<div class="message-box communication-message" id="messageBox"></div>
      <div class="pictogram-row action-grid" id="messagePictograms"></div>
      <div class="panel-actions">
        <button class="btn secondary small" id="clearBtn" type="button">Limpiar</button>
        <button class="btn primary small" id="speakBtn" type="button">🔊 Escuchar</button>
        <button class="btn mint small" id="sendBtn" type="button">➜ Enviar</button>
      </div>
      <small class="panel-status" id="messageStatus" role="status"></small>
      <div class="frases-box">
        <h5>⭐ Mis frases</h5>
        <div id="frasesList" class="frases-list"></div>
        <form id="fraseForm" class="frase-form">
          <input id="fraseInput" type="text" placeholder="Escribe una nueva frase..." autocomplete="off">
          <button class="btn mint small" type="submit">+ Añadir</button>
        </form>
      </div>`
  },
  pictogramas: {
    title: "Biblioteca de pictogramas",
    html: `<div class="pictogram-row action-grid" id="libraryPictograms"></div>
      <p class="muted">Selecciona un pictograma para escuchar su significado.</p>
      <small class="panel-status" id="libraryStatus" role="status"></small>`
  },
  actividades: {
    title: "Actividades",
    html: `<div class="task-list" id="activityList"></div>
      <small class="panel-status" id="activityStatus" role="status"></small>`
  },
  rutina: {
    title: "Rutina diaria",
    html: `<div class="task-list">${routine.map(([time, icon, text]) =>
      `<button class="task-item" type="button" data-say="${time}, ${text}">
        <span>${icon}</span><b>${time}</b><small>${text}</small>
      </button>`).join("")}</div>
      <small class="panel-status" id="routineStatus" role="status"></small>`
  },
  calendario: {
    title: "Calendario",
    html: `<div class="calendar" id="calendarBox"></div>`
  },
  progreso: {
    title: "Informe de progreso",
    html: `<div class="message-box">📈 Comunicación <b>80%</b></div><br>
      <div class="message-box">🌱 Autonomía <b>65%</b></div><br>
      <div class="message-box">⭐ Rutina <b>90%</b></div>`
  },
  perfil: {
    title: "Perfil",
    html: `<div class="message-box" id="profileBox"></div>
      <div class="panel-actions">
        <button class="btn primary small" id="profileSpeakBtn" type="button">🔊 Escuchar perfil</button>
      </div>`
  },
  chatFamiliares: {
    title: "Chat - Familiares",
    html: chatShell("chatFamiliares")
  },
  chatProfesional: {
    title: "Chat - Profesional",
    html: chatShell("chatProfesional")
  },
  chatPares: {
    title: "Chat - Pares",
    html: chatShell("chatPares")
  }
};

const ROLE_LABEL = { persona: "Persona con TEA", familiar: "Familiar / Cuidador", profesional: "Profesional" };

function currentUser(){
  try { return JSON.parse(localStorage.getItem("ctea-user") || "null"); } catch (e) { return null; }
}

function userKey(base){
  const u = currentUser();
  return base + (u && u.email ? "-" + u.email : "");
}

function getStored(key, fallback){
  try { return JSON.parse(localStorage.getItem(userKey(key)) || JSON.stringify(fallback)); }
  catch (e) { return fallback; }
}

function setStored(key, value){
  try { localStorage.setItem(userKey(key), JSON.stringify(value)); } catch (e) {}
}

function speakText(text){
  if (!text) return;
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    speechSynthesis.speak(utterance);
  } else {
    alert("Tu navegador no permite texto a voz.");
  }
}

function setPanel(key){
  const data = panelData[key];
  if (!data) return;
  document.getElementById("panelTitle").textContent = data.title;
  document.getElementById("panelContent").innerHTML = data.html;
  document.querySelectorAll(".side-item").forEach(btn => btn.classList.toggle("active", btn.dataset.panel === key));
  initPanelExtras(key);
}

function initPanelExtras(key){
  if (key === "comunicacion") initCommunication();
  if (key === "pictogramas") initPictogramLibrary();
  if (key === "actividades") initActivities();
  if (key === "rutina") initRoutine();
  if (key === "calendario") initCalendar();
  if (key === "perfil") initProfile();
  if (key.startsWith("chat")) initChat(key);
}

function getMessage(){
  return getStored("ctea-current-message", defaultMessage);
}

function saveMessage(parts){
  setStored("ctea-current-message", parts);
}

function renderMessage(){
  const box = document.getElementById("messageBox");
  if (!box) return;
  const parts = getMessage();
  box.innerHTML = parts.length
    ? `${parts.join(" ")} <span>😊</span>`
    : `<span class="muted">Elige pictogramas para crear tu mensaje.</span>`;
}

function initCommunication(){
  const row = document.getElementById("messagePictograms");
  const status = document.getElementById("messageStatus");
  if (!row) return;

  row.innerHTML = pictograms.map(item =>
    `<button class="pictogram-card" type="button" data-text="${item.text}">
      ${item.icon}<small>${item.text}</small>
    </button>`).join("");

  row.addEventListener("click", e => {
    const card = e.target.closest("[data-text]");
    if (!card) return;
    const parts = getMessage();
    parts.push(card.dataset.text);
    saveMessage(parts);
    renderMessage();
    if (status) status.textContent = `"${card.dataset.text}" agregado al mensaje.`;
  });

  document.getElementById("clearBtn")?.addEventListener("click", () => {
    saveMessage([]);
    renderMessage();
    if (status) status.textContent = "Mensaje limpio.";
  });

  document.getElementById("speakBtn")?.addEventListener("click", () => {
    const text = getMessage().join(" ");
    speakText(text || "No hay mensaje para escuchar.");
    if (status) status.textContent = "Reproduciendo mensaje.";
  });

  document.getElementById("sendBtn")?.addEventListener("click", () => {
    const text = getMessage().join(" ").trim();
    if (!text) {
      if (status) status.textContent = "Primero agrega palabras al mensaje.";
      return;
    }
    const frases = getFrases();
    frases.unshift(text);
    saveFrases([...new Set(frases)].slice(0, 8));
    saveMessage([]);
    renderMessage();
    initFrases();
    if (status) status.textContent = "Mensaje enviado y guardado en tus frases.";
  });

  initFrases();
  renderMessage();
}

function initPictogramLibrary(){
  const row = document.getElementById("libraryPictograms");
  const status = document.getElementById("libraryStatus");
  if (!row) return;
  row.innerHTML = pictograms.map(item =>
    `<button class="pictogram-card" type="button" data-text="${item.text}">
      ${item.icon}<small>${item.text}</small>
    </button>`).join("");
  row.addEventListener("click", e => {
    const card = e.target.closest("[data-text]");
    if (!card) return;
    speakText(card.dataset.text);
    if (status) status.textContent = `Pictograma seleccionado: ${card.dataset.text}.`;
  });
}

function initActivities(){
  const list = document.getElementById("activityList");
  const status = document.getElementById("activityStatus");
  if (!list) return;
  const done = getStored("ctea-activities", []);

  function render(){
    list.innerHTML = activities.map((item, index) => {
      const checked = done.includes(index);
      return `<button class="task-item ${checked ? "done" : ""}" type="button" data-activity="${index}">
        <span>${item.icon}</span><b>${item.title}</b><small>${checked ? "Completada" : item.detail}</small>
      </button>`;
    }).join("");
  }

  list.addEventListener("click", e => {
    const item = e.target.closest("[data-activity]");
    if (!item) return;
    const index = Number(item.dataset.activity);
    const pos = done.indexOf(index);
    if (pos >= 0) done.splice(pos, 1);
    else done.push(index);
    setStored("ctea-activities", done);
    render();
    if (status) status.textContent = "Actividad actualizada.";
  });

  render();
}

function initRoutine(){
  const status = document.getElementById("routineStatus");
  document.querySelectorAll("[data-say]").forEach(btn => {
    btn.addEventListener("click", () => {
      speakText(btn.dataset.say);
      if (status) status.textContent = btn.dataset.say;
    });
  });
}

function initCalendar(){
  const box = document.getElementById("calendarBox");
  if (!box) return;
  renderCalendar(box);
}

function renderCalendar(box){
  const today = new Date();
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthName = calendarDate.toLocaleDateString("es-ES", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const cells = [];

  for (let i = 0; i < offset; i++) cells.push(`<span class="calendar-day empty"></span>`);
  for (let day = 1; day <= totalDays; day++) {
    const events = calendarEvents[day] || [];
    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    cells.push(`<button class="calendar-day ${isToday ? "today" : ""} ${events.length ? "has-event" : ""}" type="button" data-day="${day}">
      <b>${day}</b>${events.length ? `<small>${events.length}</small>` : ""}
    </button>`);
  }

  box.innerHTML = `<div class="calendar-head">
      <button class="btn secondary small" id="prevMonth" type="button">‹</button>
      <h5>${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}</h5>
      <button class="btn secondary small" id="nextMonth" type="button">›</button>
    </div>
    <div class="calendar-week"><span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span></div>
    <div class="calendar-grid">${cells.join("")}</div>
    <div class="message-box calendar-detail" id="calendarDetail">Selecciona un dia para ver sus actividades.</div>`;

  box.querySelectorAll("[data-day]").forEach(btn => {
    btn.addEventListener("click", () => {
      const day = Number(btn.dataset.day);
      const events = calendarEvents[day] || ["No hay actividades programadas."];
      document.getElementById("calendarDetail").innerHTML = `<b>${day} de ${monthName} de ${year}</b><br>${events.join("<br>")}`;
    });
  });
  document.getElementById("prevMonth")?.addEventListener("click", () => {
    calendarDate = new Date(year, month - 1, 1);
    renderCalendar(box);
  });
  document.getElementById("nextMonth")?.addEventListener("click", () => {
    calendarDate = new Date(year, month + 1, 1);
    renderCalendar(box);
  });
}

function initProfile(){
  const user = currentUser();
  const name = user?.name || "Valeria Gomez";
  const role = ROLE_LABEL[user?.role] || "Persona con TEA";
  const box = document.getElementById("profileBox");
  if (box) box.innerHTML = `👤 <b>${name}</b><br>${role}<br><small>Preferencias · Notificaciones · Seguridad</small>`;
  document.getElementById("profileSpeakBtn")?.addEventListener("click", () => speakText(`${name}. ${role}.`));
}

function getFrases(){
  return getStored("ctea-frases", []);
}

function saveFrases(frases){
  setStored("ctea-frases", frases);
}

function initFrases(){
  const list = document.getElementById("frasesList");
  const form = document.getElementById("fraseForm");
  if (!list || !form) return;

  function render(){
    const frases = getFrases();
    list.innerHTML = frases.length
      ? frases.map((f, i) => `<div class="frase-item"><button type="button" data-speak="${i}">🔊 ${f}</button><button type="button" class="del" data-del="${i}" aria-label="Eliminar">×</button></div>`).join("")
      : `<p class="muted">Aun no tienes frases. Añade la primera abajo.</p>`;
  }

  list.onclick = e => {
    const speakIdx = e.target?.dataset?.speak;
    const delIdx = e.target?.dataset?.del;
    if (speakIdx !== undefined) {
      speakText(getFrases()[speakIdx]);
    } else if (delIdx !== undefined) {
      const frases = getFrases();
      frases.splice(Number(delIdx), 1);
      saveFrases(frases);
      render();
    }
  };

  form.onsubmit = e => {
    e.preventDefault();
    const input = document.getElementById("fraseInput");
    const text = input.value.trim();
    if (!text) return;
    const frases = getFrases();
    frases.unshift(text);
    saveFrases([...new Set(frases)].slice(0, 8));
    input.value = "";
    render();
  };

  render();
}

const CHAT_REPLIES = {
  chatFamiliares: ["¡Hola! ¿Cómo va todo? ❤️", "Estamos orgullosos de ti 😊", "Te queremos mucho 💛"],
  chatProfesional: ["Gracias por contarme. Mañana lo vemos en la sesión.", "¡Muy buen avance! Sigue así 👍", "Anotado. Recuerda el ejercicio de respiración."],
  chatPares: ["¡Hola! ¿Jugamos después? ⚽", "¡Qué bien! 😄", "Nos vemos en la escuela 🏫"]
};

function getChat(key){
  return getStored("ctea-chat-" + key, []);
}

function saveChat(key, msgs){
  setStored("ctea-chat-" + key, msgs);
}

function chatShell(key){
  const info = CHAT_INFO[key];
  return `<div class="chat">
    <div class="chat-switch" aria-label="Cambiar chat">
      <button class="${key === "chatFamiliares" ? "selected" : ""}" type="button" data-chat-panel="chatFamiliares">Familia</button>
      <button class="${key === "chatProfesional" ? "selected" : ""}" type="button" data-chat-panel="chatProfesional">Profesional</button>
      <button class="${key === "chatPares" ? "selected" : ""}" type="button" data-chat-panel="chatPares">Pares</button>
    </div>
    <div class="chat-header">
      <div class="chat-avatar">${info.icon}</div>
      <div>
        <b>${info.name}</b>
        <small>${info.subtitle}</small>
      </div>
      <button class="btn secondary small" id="clearChatBtn" type="button">Limpiar</button>
    </div>
    <div class="chat-quick" id="chatQuick">
      ${info.quick.map(text => `<button type="button" data-quick="${text}">${text}</button>`).join("")}
    </div>
    <div class="chat-msgs" id="chatMsgs" aria-live="polite"></div>
    <form id="chatForm" class="chat-form">
      <input id="chatInput" type="text" placeholder="${info.placeholder}" autocomplete="off">
      <button class="btn primary small" type="submit">Enviar</button>
    </form>
    <small class="panel-status" id="chatStatus" role="status"></small>
  </div>`;
}

function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function formatTime(){
  return new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

function initChat(key){
  const info = CHAT_INFO[key];
  const box = document.getElementById("chatMsgs");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const status = document.getElementById("chatStatus");
  if (!box || !form) return;

  function render(){
    let msgs = getChat(key);
    if (!msgs.length) {
      msgs = [{ me: false, text: info.welcome, time: formatTime() }];
      saveChat(key, msgs);
    }
    box.innerHTML = msgs.length
      ? msgs.map(m => `<div class="chat-msg ${m.me ? "me" : "them"}">
          <p>${escapeHTML(m.text)}</p>
          <small>${m.me ? "Tu" : info.name} · ${m.time || ""}</small>
        </div>`).join("")
      : `<p class="muted">No hay mensajes todavía. ¡Escribe el primero!</p>`;
    box.scrollTop = box.scrollHeight;
  }

  function sendMessage(text){
    const cleanText = text.trim();
    if (!cleanText) return;
    const msgs = getChat(key);
    msgs.push({ me: true, text: cleanText, time: formatTime() });
    saveChat(key, msgs);
    if (input) input.value = "";
    render();
    if (status) status.textContent = "Mensaje enviado.";
    setTimeout(() => {
      const replies = CHAT_REPLIES[key];
      const updated = getChat(key);
      updated.push({ me: false, text: replies[Math.floor(Math.random() * replies.length)], time: formatTime() });
      saveChat(key, updated);
      if (document.getElementById("chatMsgs")) render();
    }, 700);
  }

  form.onsubmit = e => {
    e.preventDefault();
    sendMessage(input?.value || "");
  };

  document.getElementById("chatQuick")?.addEventListener("click", e => {
    const btn = e.target.closest("[data-quick]");
    if (!btn) return;
    sendMessage(btn.dataset.quick);
  });

  document.querySelectorAll("[data-chat-panel]").forEach(btn => {
    btn.addEventListener("click", () => setPanel(btn.dataset.chatPanel));
  });

  document.getElementById("clearChatBtn")?.addEventListener("click", () => {
    saveChat(key, []);
    render();
    if (status) status.textContent = "Conversacion limpiada.";
  });

  render();
}

document.querySelectorAll(".side-item").forEach(btn => {
  btn.addEventListener("click", () => setPanel(btn.dataset.panel));
});

document.querySelectorAll(".quick-card").forEach(btn => {
  btn.addEventListener("click", () => {
    const map = { comunicar: "comunicacion", pictogramas: "pictogramas", actividad: "actividades", rutina: "rutina" };
    setPanel(map[btn.dataset.action]);
    document.querySelector(".dashboard").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  try { localStorage.removeItem("ctea-user"); } catch (e) {}
});

try {
  const user = currentUser();
  if (user && user.name) {
    const first = user.name.split(" ")[0];
    const welcome = document.getElementById("welcome");
    if (welcome) welcome.textContent = `¡Hola, ${first}! 👋`;
    const avatar = document.getElementById("avatar");
    if (avatar) avatar.textContent = first.charAt(0).toUpperCase();
    const sub = document.querySelector(".dash-top p");
    if (sub && user.role) sub.textContent = `Rol: ${ROLE_LABEL[user.role] || user.role} · ¿Qué quieres hacer hoy?`;
  }
} catch (e) {}

initPanelExtras("comunicacion");
