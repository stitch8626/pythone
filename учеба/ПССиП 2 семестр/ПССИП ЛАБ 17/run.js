// Импортируем функции из наших модулей
import { add } from './math.js';
import { capitalize, findMax } from './utils.js';
import { getArea, getCircumference } from './circle.js';

console.log("=== ЛАБОРАТОРНАЯ РАБОТА №17 ===\n");

// --- ЗАДАНИЕ 1 ---
console.log("--- Задание 1 (math.js) ---");
const sum = add(5, 10);
console.log(`Результат сложения 5 + 10 = ${sum}\n`);

// --- ЗАДАНИЕ 3 ---
// (Задание 3 идет перед 2, чтобы чтение файла не прерывало вывод, 
// так как в твоем file.js код выполняется сразу без вызова функции)
console.log("--- Задание 3 (utils.js) ---");
const testString = "лабораторная работа выполнена";
const testArray = [4, 15, 8, 42, 16, 23];

console.log(`До форматирования: "${testString}"`);
console.log(`После capitalize: "${capitalize(testString)}"`);
console.log(`Массив: [${testArray}]`);
console.log(`Максимальное число: ${findMax(testArray)}\n`);

// --- ЗАДАНИЕ 4 ---
console.log("--- Задание 4 (circle.js) ---");
const radius = 5;
console.log(`При радиусе = ${radius}:`);
console.log(`Площадь круга = ${getArea(radius).toFixed(2)}`);
console.log(`Длина окружности = ${getCircumference(radius).toFixed(2)}\n`);

// --- ЗАДАНИЕ 2 ---
console.log("--- Задание 2 (file.js) ---");
/* Поскольку твой file.js не экспортирует функцию, а сразу выполняет код,
  мы используем динамический импорт (await import). 
  Обычный import сработал бы в самом начале файла до всех console.log.
*/
await import('./file.js');