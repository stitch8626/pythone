// circle_test.js
import { getArea, getCircumference } from './circle.js';

const radius = 5;

console.log(`Задание 4: Площадь круга с радиусом ${radius} = ${getArea(radius).toFixed(2)}`);
console.log(`Задание 4: Длина окружности с радиусом ${radius} = ${getCircumference(radius).toFixed(2)}`);