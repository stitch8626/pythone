const fs = require('fs').promises;
const path = require('path');

/**
 * 1. Функция для создания файла fresh.txt
 */
async function createFreshFile() {
    try {
        const filePath = path.join(__dirname, 'fresh.txt');
        const content = 'I am fresh and young';
        
        await fs.writeFile(filePath, content, 'utf8');
        console.log('Файл fresh.txt успешно создан!');
    } catch (err) {
        console.error('Ошибка при создании файла:', err.message);
    }
}

/**
 * 2. Функция для чтения содержимого fileToRead.txt
 */
async function readFileContent() {
    try {
        const filePath = path.join(__dirname, 'fileToRead.txt');
        
        
        const data = await fs.readFile(filePath, 'utf8');
        
        console.log('--- Содержимое fileToRead.txt ---');
        console.log(data);
        console.log('---------------------------------');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Ошибка: Файл fileToRead.txt не найден. Сначала создайте его.');
        } else {
            console.error('Ошибка при чтении файла:', err.message);
        }
    }
}

// Запуск функций для проверки
async function main() {
    await createFreshFile();
    await readFileContent();
}

main();