// 1. Приветствие (можно оставить в консоли)
console.log("Здравствуйте! Это демо заданий по работе со строками в JavaScript.");

// Исходный текст (задания 3–5)
const originalText =
  "Однажды утром, после сильной бури, Костя и его младшая сестра Маша отправились на прогулку. " +
  "Они любили это место за тишину и прохладу. Вдруг у самого корня дерева Маша заметила что-то блестящее. " +
  "Это была маленькая, потемневшая от времени металлическая коробочка.";

// Записываем исходный текст в блок на странице
document.getElementById("original-text").textContent = originalText;

// 2. Работа со строкой пользователя

const userInputEl = document.getElementById("user-input");
const replaceTextEl = document.getElementById("replace-text");
const processBtn = document.getElementById("process-btn");
const wordCountEl = document.getElementById("word-count");
const changedSentenceEl = document.getElementById("changed-sentence");

processBtn.addEventListener("click", () => {
  // получаем строку пользователя
  let userInput = userInputEl.value.trim();

  if (!userInput) {
    alert("Пожалуйста, введите строку пользователя.");
    return;
  }

  // 2.1 разделяем на слова, считаем количество
  // split(/\s+/) — делим по одному или нескольким пробелам/пропускам
  let words = userInput.split(/\s+/);
  wordCountEl.textContent = words.length.toString();

  // 2.2 удаляем второй и третий элементы и заменяем их на подстроку
  const newSubstr = replaceTextEl.value || "Новая_подстрока";

  // если слов меньше 2, то splicing смысла не имеет — просто покажем строку
  if (words.length >= 2) {
    // если меньше 3 слов, удалим только один (второй)
    const deleteCount = words.length >= 3 ? 2 : 1;
    words.splice(1, deleteCount, newSubstr);
  }

  // 2.3 собираем предложение обратно
  const resultSentence = words.join(" ");
  changedSentenceEl.textContent = resultSentence;

  /*
    Комментарии к заданию 2:

    userInput.split(/\s+/) — разбивает строку на массив слов,
    используя регулярное выражение \s+ (один или более пробельных символов).

    words.length — даёт количество элементов массива, то есть количество слов.

    words.splice(1, deleteCount, newSubstr) — удаляет
    deleteCount элементов, начиная со второго (индекс 1), и вставляет на их место строку newSubstr.

    words.join(" ") — соединяет массив обратно в строку, вставляя между элементами пробел.

    Результат записываем в changedSentenceEl.textContent, чтобы показать на странице.
  */
});

// 3. Удаление всех вхождений «а» / «А»

const removeABtn = document.getElementById("remove-a-btn");
const textNoAEl = document.getElementById("text-no-a");

removeABtn.addEventListener("click", () => {
  // /а/gi — буква "а" независимо от регистра, глобально по всей строке
  const textWithoutA = originalText.replace(/а/gi, "");
  textNoAEl.textContent = textWithoutA;
});

// 4. Верхний регистр

const upperBtn = document.getElementById("upper-btn");
const textUpperEl = document.getElementById("text-upper");

upperBtn.addEventListener("click", () => {
  const upperText = originalText.toUpperCase();
  textUpperEl.textContent = upperText;
});

// 5. Посимвольный вывод текста

const charsBtn = document.getElementById("chars-btn");
const textCharsEl = document.getElementById("text-chars");

charsBtn.addEventListener("click", () => {
  let builder = "";

  // проходим по каждому символу строки
  for (const ch of originalText) {
    builder += ch + "\n";
  }

  textCharsEl.textContent = builder;
});
