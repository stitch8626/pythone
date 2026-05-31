// -------- Задание 1 — User --------
const userOutput = document.getElementById("userOutput");
let User = null;

document.getElementById("createUserBtn").addEventListener("click", () => {
  const name = document.getElementById("userName").value.trim() || "Без имени";
  const email = document.getElementById("userEmail").value.trim() || "no-email@example.com";
  const ageValue = document.getElementById("userAge").value.trim();
  const age = ageValue === "" ? 0 : Number(ageValue);

  User = {
    name,
    email,
    age,
    updateEmail(newEmail) {
      if (typeof newEmail === "string" && newEmail.includes("@")) {
        this.email = newEmail;
      }
    },
  };
  renderUser();
});

document.getElementById("updateEmailBtn").addEventListener("click", () => {
  if (!User) { alert("Сначала создайте пользователя"); return; }
  const newEmail = document.getElementById("newUserEmail").value.trim();
  if (!newEmail) { alert("Введите новый email"); return; }
  User.updateEmail(newEmail);
  renderUser();
});

function renderUser() {
  userOutput.textContent = User ? JSON.stringify(User, null, 2) : "Пользователь не создан.";
}

// -------- Задание 2 — Timer --------
const timerOutput = document.getElementById("timerOutput");
const Timer = {
  seconds: 0,
  _intervalId: null,
  start() {
    if (this._intervalId !== null) return;
    this._intervalId = setInterval(() => {
      this.seconds += 1;
      timerOutput.textContent = String(this.seconds);
    }, 1000);
  },
  stop() {
    if (this._intervalId !== null) { clearInterval(this._intervalId); this._intervalId = null; }
  },
  reset() { this.stop(); this.seconds = 0; timerOutput.textContent = "0"; },
};

document.getElementById("timerStartBtn").addEventListener("click", () => Timer.start());
document.getElementById("timerStopBtn").addEventListener("click", () => Timer.stop());
document.getElementById("timerResetBtn").addEventListener("click", () => Timer.reset());

// -------- Задание 3 — TaskList --------
const taskListOutput = document.getElementById("taskListOutput");
const taskCountOutput = document.getElementById("taskCountOutput");
const TaskList = {
  tasks: [],
  addTask(text) { if (text.trim()) this.tasks.push(text.trim()); },
  removeTask(text) { this.tasks = this.tasks.filter((t) => t !== text); },
  getTaskCount() { return this.tasks.length; },
};

function renderTasks() {
  taskListOutput.textContent = TaskList.tasks.length ? TaskList.tasks.map((t, i) => `${i + 1}. ${t}`).join("\n") : "Список задач пуст.";
  taskCountOutput.textContent = String(TaskList.getTaskCount());
}

document.getElementById("addTaskBtn").addEventListener("click", () => {
  TaskList.addTask(document.getElementById("taskInput").value);
  document.getElementById("taskInput").value = "";
  renderTasks();
});

document.getElementById("removeTaskBtn").addEventListener("click", () => {
  TaskList.removeTask(document.getElementById("removeTaskInput").value);
  renderTasks();
});

// -------- Задание 4 — Wallet --------
const walletBalanceOutput = document.getElementById("walletBalanceOutput");
let Wallet = null;

document.getElementById("walletCreateBtn").addEventListener("click", () => {
  const initial = Number(document.getElementById("walletInitial").value) || 0;
  Wallet = {
    balance: initial,
    deposit(amount) { if (amount > 0) this.balance += Number(amount); },
    withdraw(amount) { if (amount > 0 && this.balance >= amount) this.balance -= Number(amount); },
    checkBalance() { return this.balance; }
  };
  renderWallet();
});

function renderWallet() {
  walletBalanceOutput.textContent = Wallet ? String(Wallet.checkBalance()) : "Кошелёк не создан.";
}

document.getElementById("walletDepositBtn").addEventListener("click", () => {
  if (Wallet) { Wallet.deposit(document.getElementById("walletDepositAmount").value); renderWallet(); }
});

document.getElementById("walletWithdrawBtn").addEventListener("click", () => {
  if (Wallet) { Wallet.withdraw(document.getElementById("walletWithdrawAmount").value); renderWallet(); }
});

// -------- Задание 5 — Player --------
const playerOutput = document.getElementById("playerOutput");
let Player = null;

document.getElementById("playerCreateBtn").addEventListener("click", () => {
  Player = {
    nickname: document.getElementById("playerNickname").value || "Player",
    level: Number(document.getElementById("playerLevel").value) || 1,
    exp: Number(document.getElementById("playerExp").value) || 0,
    gainExp(amount) {
      this.exp += Number(amount);
      while (this.exp >= 100) { this.exp -= 100; this.level++; }
    }
  };
  renderPlayer();
});

function renderPlayer() {
  playerOutput.textContent = Player ? JSON.stringify(Player, null, 2) : "Игрок не создан.";
}

document.getElementById("playerGainExpBtn").addEventListener("click", () => {
  if (Player) { Player.gainExp(document.getElementById("playerGainExpAmount").value); renderPlayer(); }
});

// -------- Задание 6 — СЕКЦИЯ С БАГАМИ (Для ЛР11) --------
document.getElementById("uploadPhotoBtn").addEventListener("click", () => {
  const avatar = document.getElementById("userAvatar");
  const loader = document.getElementById("loader");

  // Имитируем начало загрузки
  loader.style.display = "block"; 

  // БАГ №1: Мы программно меняем src, но забыли переключить display: block. 
  // Картинка в DOM есть, но пользователь её не видит.
  avatar.src = "https://via.placeholder.com/100/1976d2/ffffff?text=User";
  
  // БАГ №2: "Вечный лоадер". Нет функции, которая бы скрывала loader через время.
  console.log("Логика завершена, но ошибки мешают отображению.");
});