// Форматирование строки: делает первую букву заглавной
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Поиск максимального числа в массиве
export function findMax(arr) {
  return Math.max(...arr);
}