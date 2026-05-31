// file.js
import fs from 'fs';

try {
    // Читаем файл синхронно в кодировке utf8
    const text = fs.readFileSync('text.txt', 'utf8');
    console.log("Задание 2 (Содержимое файла):\n" + text);
} catch (error) {
    console.error("Ошибка при чтении файла:", error.message);
}