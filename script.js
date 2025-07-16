/* ================================
   GRUNDVARIABLEN & DOM ELEMENTE
   ================================ */
const loginDiv = document.getElementById('login');
const registerDiv = document.getElementById('register');
const chatDiv = document.getElementById('chat');

const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const sendBtn = document.getElementById('send-btn');

const showRegisterBtn = document.getElementById('show-register-btn');
const showLoginBtn = document.getElementById('show-login-btn');

const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const messagesDiv = document.getElementById('messages');

const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

const registerUsername = document.getElementById('register-username');
const registerPassword = document.getElementById('register-password');
const registerPasswordConfirm = document.getElementById('register-password-confirm');

const messageInput = document.getElementById('message-input');

/* ================================
   EINFACHE USER-DATEN (FAKE DB)
   ================================ */
const users = {}; // username: password
let currentUser = null;
const messages = [];

/* ================================
   LOGIN-FUNKTION
   ================================ */
loginBtn.addEventListener('click', () => {
  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  loginError.textContent = '';

  if (!username || !password) {
    loginError.textContent = 'Bitte Benutzername und Passwort eingeben.';
    return;
  }

  if (!users[username] || users[username] !== password) {
    loginError.textContent = 'Benutzername oder Passwort falsch.';
    return;
  }

  currentUser = username;
  showChat();
});

/* ================================
   REGISTRIERUNG-FUNKTION
   ================================ */
registerBtn.addEventListener('click', () => {
  const username = registerUsername.value.trim();
  const password = registerPassword.value;
  const passwordConfirm = registerPasswordConfirm.value;

  registerError.textContent = '';

  if (!username || !password || !passwordConfirm) {
    registerError.textContent = 'Bitte alle Felder ausfüllen.';
    return;
  }

  if (password !== passwordConfirm) {
    registerError.textContent = 'Passwörter stimmen nicht überein.';
    return;
  }

  if (users[username]) {
    registerError.textContent = 'Benutzername existiert bereits.';
    return;
  }

  users[username] = password;
  alert('Registrierung erfolgreich! Du kannst dich jetzt einloggen.');
  showLogin();
});

/* ================================
   CHAT-NACHRICHT SENDEN
   ================================ */
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const message = {
    user: currentUser,
    text: text,
    time: new Date(),
  };

  messages.push(message);
  renderMessages();
  messageInput.value = '';
}

/* ================================
   NACHRICHTEN ANZEIGEN
   ================================ */
function renderMessages() {
  messagesDiv.innerHTML = '';
  for (const msg of messages) {
    const msgEl = document.createElement('div');
    msgEl.classList.add('message');

    const userEl = document.createElement('div');
    userEl.classList.add('username');
    userEl.textContent = msg.user;

    const textEl = document.createElement('div');
    textEl.textContent = msg.text;

    const timeEl = document.createElement('div');
    timeEl.classList.add('timestamp');
    timeEl.textContent = msg.time.toLocaleTimeString();

    msgEl.appendChild(userEl);
    msgEl.appendChild(textEl);
    msgEl.appendChild(timeEl);

    messagesDiv.appendChild(msgEl);
  }
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ================================
   UI SWITCH: LOGIN <-> REGISTRIERUNG
   ================================ */
showRegisterBtn.addEventListener('click', showRegister);
showLoginBtn.addEventListener('click', showLogin);

function showRegister() {
  loginDiv.style.display = 'none';
  registerDiv.style.display = 'block';
  chatDiv.style.display = 'none';
  clearErrors();
  clearInputs();
}

function showLogin() {
  loginDiv.style.display = 'block';
  registerDiv.style.display = 'none';
  chatDiv.style.display = 'none';
  clearErrors();
  clearInputs();
}

/* ================================
   CHAT ANZEIGEN & LOGOUT
   ================================ */
function showChat() {
  loginDiv.style.display = 'none';
  registerDiv.style.display = 'none';
  chatDiv.style.display = 'block';
  clearErrors();
  clearInputs();
  renderMessages();
}

logoutBtn.addEventListener('click', () => {
  currentUser = null;
  messages.length = 0;
  showLogin();
});

/* ================================
   HILFSFUNKTIONEN
   ================================ */
function clearErrors() {
  loginError.textContent = '';
  registerError.textContent = '';
}

function clearInputs() {
  loginUsername.value = '';
  loginPassword.value = '';
  registerUsername.value = '';
  registerPassword.value = '';
  registerPasswordConfirm.value = '';
  messageInput.value = '';
}
