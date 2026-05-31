// Лабораторная работа №13
// "Использование функций в сценариях на языке JavaScript"

// ===== ЗАДАНИЕ 1: createGreeter =====

/**
 * Функция createGreeter(greeting) создаёт и возвращает функцию-приветствие.
 * greeting - строка, например "Привет" или "Здравствуйте".
 * Возвращаемая функция принимает name и возвращает `${greeting}, ${name}!`.
 * Если name не является строкой, возвращается сообщение об ошибке.
 */
function createGreeter(greeting) {
  return function (name) {
    if (typeof name !== "string") {
      return "Ошибка: имя должно быть строкой";
    }
    return `${greeting}, ${name}!`;
  };
}

const greeterBtn = document.getElementById("greeterBtn");
const greeterOutput = document.getElementById("greeterOutput");

greeterBtn.addEventListener("click", () => {
  const greeting = document.getElementById("greeting").value.trim() || "Привет";
  const name = document.getElementById("nameInput").value.trim();

  const greeter = createGreeter(greeting);
  const result = greeter(name);
  greeterOutput.textContent = result;
  console.log("createGreeter result:", result);
});

// ===== ЗАДАНИЕ 2: sumUnique =====

/**
 * sumUnique(...args) принимает произвольное количество аргументов
 * и возвращает сумму только уникальных ЧИСЕЛ.
 * Нечисловые значения игнорируются.
 */
function sumUnique(...args) {
  // отфильтруем только числа
  const numbers = args.filter((item) => typeof item === "number" && !Number.isNaN(item));
  // создаём Set, чтобы убрать дубликаты
  const uniqueNumbers = new Set(numbers);
  // суммируем
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }
  return sum;
}

const sumBtn = document.getElementById("sumBtn");
const sumOutput = document.getElementById("sumOutput");

sumBtn.addEventListener("click", () => {
  const raw = document.getElementById("sumInput").value;
  // разбиваем по запятым и пробелам
  const parts = raw.split(/[,;]/).map((p) => p.trim()).filter((p) => p !== "");

  // превращаем в числа (может быть NaN)
  const args = parts.map((p) => Number(p));
  // sumUnique сам проигнорирует NaN
  const result = sumUnique(...args);
  sumOutput.textContent = String(result);
  console.log("sumUnique args:", args, "result:", result);
});

// ===== ЗАДАНИЕ 3: factorial =====

/**
 * Рекурсивная функция factorial(n) возвращает n! для 0 <= n <= 20.
 * Если число вне диапазона, возвращает null и пишет в консоль предупреждение.
 */
function factorial(n) {
  if (typeof n !== "number" || !Number.isInteger(n)) {
    console.log("Число вне допустимого диапазона");
    return null;
  }

  if (n < 0 || n > 20) {
    console.log("Число вне допустимого диапазона");
    return null;
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

const factBtn = document.getElementById("factBtn");
const factOutput = document.getElementById("factOutput");

factBtn.addEventListener("click", () => {
  const n = Number(document.getElementById("factInput").value);
  const result = factorial(n);
  factOutput.textContent = result === null ? "null" : String(result);
  console.log("factorial(", n, ") =", result);
});

// ===== ЗАДАНИЕ 4: createTimer =====

/**
 * createTimer() создаёт замыкание для измерения общего времени обработки.
 * Возвращает объект:
 *  - filterWithDelay: функция, принимающая массив чисел, фильтрует их
 *    (оставляет только положительные) с задержкой через setTimeout.
 *  - getTotalTime: метод, возвращающий общее время обработки (мс).
 */
function createTimer() {
  let totalTime = 0; // хранится в замыкании

  function filterWithDelay(arr, callback) {
    const start = Date.now();

    setTimeout(() => {
      const filtered = arr.filter((n) => typeof n === "number" && n > 0);

      const end = Date.now();
      const duration = end - start;
      totalTime += duration;

      console.log("Отфильтрованный массив:", filtered);
      console.log("Количество элементов:", filtered.length);
      console.log("Время обработки (мс):", duration);

      if (typeof callback === "function") {
        callback(filtered, duration);
      }
    }, 1000); // задержка 1 секунда
  }

  function getTotalTime() {
    return totalTime;
  }

  return {
    filterWithDelay,
    getTotalTime,
  };
}

const timer = createTimer();
const timerFilterBtn = document.getElementById("timerFilterBtn");
const timerStatsBtn = document.getElementById("timerStatsBtn");
const timerOutput = document.getElementById("timerOutput");
const timerTimeOutput = document.getElementById("timerTimeOutput");

timerFilterBtn.addEventListener("click", () => {
  const raw = document.getElementById("timerInput").value;
  const parts = raw.split(/[,;]/).map((p) => p.trim()).filter((p) => p !== "");
  const arr = parts.map((p) => Number(p));

  timerOutput.textContent = "Ожидание результата (1 секунда)...";

  timer.filterWithDelay(arr, (filtered, duration) => {
    timerOutput.textContent =
      "Результат: [" +
      filtered.join(", ") +
      "]\nКоличество элементов: " +
      filtered.length +
      "\nВремя обработки (мс): " +
      duration;
    timerTimeOutput.textContent = String(timer.getTotalTime());
  });
});

timerStatsBtn.addEventListener("click", () => {
  timerTimeOutput.textContent = String(timer.getTotalTime());
});

// ===== ЗАДАНИЕ 5: createRandomGenerator =====

/**
 * createRandomGenerator(initialValue) создаёт генератор псевдослучайных чисел.
 * В замыкании хранится массив всех сгенерированных чисел (0–100).
 * Возвращает функцию generate(), у которой есть метод generate.getStats().
 */
function createRandomGenerator(initialValue) {
  let seed = Number(initialValue) || 0;
  const values = [];

  function generate() {
    // простейшая "подмешка" seed + Math.random()
    const rnd = Math.random() + seed;
    const value = Math.floor((rnd % 1) * 101); // 0–100
    values.push(value);
    console.log("Сгенерировано число:", value);
    return value;
  }

  generate.getStats = function () {
    if (values.length === 0) {
      return { min: null, max: null, average: null };
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((acc, v) => acc + v, 0);
    const average = sum / values.length;

    return { min, max, average };
  };

  generate.getValues = function () {
    return values.slice(); // копия массива
  };

  return generate;
}

let randomGenerator = null;
const initRandomBtn = document.getElementById("initRandomBtn");
const generateBtn = document.getElementById("generateBtn");
const statsBtn = document.getElementById("statsBtn");
const randomOutput = document.getElementById("randomOutput");
const statsOutput = document.getElementById("statsOutput");

initRandomBtn.addEventListener("click", () => {
  const seed = Number(document.getElementById("seedInput").value) || 0;
  randomGenerator = createRandomGenerator(seed);
  randomOutput.textContent = "";
  statsOutput.textContent = "";
  generateBtn.disabled = false;
  statsBtn.disabled = false;
  console.log("Создан новый генератор со seed =", seed);
});

generateBtn.addEventListener("click", () => {
  if (!randomGenerator) return;
  const value = randomGenerator();
  const all = randomGenerator.getValues();
  randomOutput.textContent = all.join(", ");
});

statsBtn.addEventListener("click", () => {
  if (!randomGenerator) return;
  const stats = randomGenerator.getStats();
  statsOutput.textContent =
    "min: " + stats.min +
    ", max: " + stats.max +
    ", average: " + (stats.average === null ? "null" : stats.average.toFixed(2));
});
