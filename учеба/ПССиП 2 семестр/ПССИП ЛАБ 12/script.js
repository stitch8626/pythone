// 1. Поприветствовать пользователя
console.log("Здравствуйте! Введите строку:");

// 3–5. Исходный текст из задания
const baseText = `Однажды утром, после сильной бури, Костя и его младшая сестра Маша отправились на прогулку. Они любили это место за тишину и прохладу. Вдруг у самого корня дерева Маша заметила что-то блестящее. Это была маленькая, потемневшая от времени металлическая коробочка.`;

// Показать текст на странице
document.getElementById("sourceText").textContent = baseText;

// 2. Обработка строки пользователя по кнопке
document.getElementById("processBtn").addEventListener("click", () => {
  // 2. Получить строку пользователя
  let userInput = document.getElementById("userInput").value.trim();

  if (!userInput) {
    alert("Введите строку для обработки");
    return;
  }

  // 2.1 Разделить строку на слова и вывести количество слов
  let words = userInput.split(/\s+/); // разделяем по одному или нескольким пробелам
  console.log("Количество слов:", words.length);
  document.getElementById("wordsCount").textContent = words.length;

  // 2.2 Удалить второй и третий элементы массива и заменить их на подстроку
  // если слов меньше 2, просто покажем исходную строку
  if (words.length >= 2) {
    // пример подстроки
    const replacement = "фа шнэйнэ";

    // splice(1, 2, replacement) — начиная со второго слова
    // удалить два и вставить одну подстроку
    words.splice(1, 2, replacement);
  }

  // 2.3 Вывести на экран полученное предложение
  let resultSentence = words.join(" ");
  console.log("Изменённое предложение:", resultSentence);
  document.getElementById("changedSentence").textContent = resultSentence;
});

/*
6. Комментарии к коду из задания 2:

// let userInput = document.getElementById("userInput").value.trim();
// здесь мы получаем исходную строку пользователя из поля ввода и убираем пробелы по краям

// let words = userInput.split(/\s+/);
// split(/\s+/) разбивает строку на массив слов, используя один или несколько пробелов как разделитель

// console.log("Количество слов:", words.length);
// length даёт количество элементов в массиве, то есть количество слов в строке

// words.splice(1, 2, replacement);
// splice с аргументами (1, 2, replacement) удаляет
// 2 элемента, начиная со второго (индекс 1 — это второй элемент массива)
// и вставляет вместо них одну новую строку replacement

// let resultSentence = words.join(" ");
// join(" ") собирает массив обратно в строку, вставляя пробел между элементами

// console.log("Изменённое предложение:", resultSentence);
// выводим итоговую изменённую строку в консоль
*/

// 3. Удалить все вхождения буквы «а» / «А»
document.getElementById("removeABtn").addEventListener("click", () => {
  let textWithoutA = baseText.replace(/а/gi, "");
  console.log("Текст без буквы «а»:\n", textWithoutA);
  document.getElementById("noAText").textContent = textWithoutA;
});

// 4. Текст в верхний регистр
document.getElementById("upperBtn").addEventListener("click", () => {
  let upper = baseText.toUpperCase();
  console.log("Текст в верхнем регистре:\n", upper);
  document.getElementById("upperText").textContent = upper;
});

// 5. Вывести текст посимвольно
document.getElementById("charsBtn").addEventListener("click", () => {
  let result = "";
  for (const ch of baseText) {
    console.log(ch);
    result += ch + "\n";
  }
  document.getElementById("charsOutput").textContent = result;
});
