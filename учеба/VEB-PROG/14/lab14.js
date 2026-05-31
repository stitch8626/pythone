 // ==========================================
// Задание 1: Объект User
// ==========================================
const User = {
    name: "Андрей",
    email: "ndrjkrpk@gmail.com",
    age: 18,

    updateEmail(newEmail) {
        this.email = newEmail;
        console.log(`[User] Email обновлен на: ${this.email}`);
    }
};

// ==========================================
// Задание 2: Объект Timer
// ==========================================
const Timer = {
    seconds: 0,
    intervalId: null,

    start() {
        if (this.intervalId) return; // Защита от двойного запуска
        console.log("[Timer] Таймер запущен.");
        this.intervalId = setInterval(() => {
            this.seconds++;
            console.log(`[Timer] Прошло секунд: ${this.seconds}`);
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        console.log("[Timer] Таймер остановлен.");
    },

    reset() {
        this.stop();
        this.seconds = 0;
        console.log("[Timer] Таймер сброшен.");
    }
};

// ==========================================
// Задание 3: Объект TaskList
// ==========================================
const TaskList = {
    tasks: [],

    addTask(taskText) {
        this.tasks.push(taskText);
        console.log(`[TaskList] Задача "${taskText}" добавлена.`);
    },

    removeTask(taskText) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task !== taskText);
        
        if (this.tasks.length < initialLength) {
            console.log(`[TaskList] Задача "${taskText}" удалена.`);
        } else {
            console.log(`[TaskList] Задача "${taskText}" не найдена.`);
        }
    },

    getTaskCount() {
        return this.tasks.length;
    }
};

// ==========================================
// Задание 4: Объект Wallet
// ==========================================
const Wallet = {
    balance: 0,

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`[Wallet] Пополнение: +${amount}. Баланс: ${this.balance}`);
        }
    },

    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`[Wallet] Снятие: -${amount}. Остаток: ${this.balance}`);
        } else {
            console.log("[Wallet] Недостаточно средств на балансе!");
        }
    },

    checkBalance() {
        return this.balance;
    }
};

// ==========================================
// Задание 5: Объект Player
// ==========================================
const Player = {
    nickname: "DragonSlayer",
    level: 1,
    exp: 0,

    gainExp(amount) {
        this.exp += amount;
        console.log(`[Player] ${this.nickname} получил ${amount} опыта. Всего: ${this.exp}`);

        while (this.exp >= 100) {
            this.level++;
            this.exp -= 100; // Сбрасываем излишек
            console.log(`[Player] Уровень повышен! Теперь уровень: ${this.level}`);
        }
    }
};


// ==========================================
// ТЕСТИРОВАНИЕ РАБОТЫ ОБЪЕКТОВ
// ==========================================

console.log("--- Тест Задания 1 ---");
User.updateEmail("new_alex@web.ru");

console.log("\n--- Тест Задания 3 ---");
TaskList.addTask("Выучить JavaScript");
TaskList.addTask("Сделать лабораторную");
console.log(`Всего задач: ${TaskList.getTaskCount()}`);
TaskList.removeTask("Выучить JavaScript");
console.log(`Всего задач: ${TaskList.getTaskCount()}`);

console.log("\n--- Тест Задания 4 ---");
console.log(`Текущий баланс: ${Wallet.checkBalance()}`);
Wallet.deposit(5000);
Wallet.withdraw(1500);
Wallet.withdraw(4000); // Ожидается ошибка нехватки средств

console.log("\n--- Тест Задания 5 ---");
Player.gainExp(50);
Player.gainExp(180); // Должен апнуть 2 уровня и оставить 30 опыта

console.log("\n--- Тест Задания 2 ---");
// Таймер запускается в самом конце, чтобы не мешать выводу других заданий
Timer.start();
setTimeout(() => {
    Timer.stop();
    Timer.reset();
}, 3500); // Остановим и сбросим таймер через 3.5 секунды