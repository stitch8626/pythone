#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';

const program = new Command();

// Настройка базовой информации (Версия и Описание)
program
  .name('lab17')
  .description('CLI-приложение для лабораторной работы №17')
  .version('1.0.0', '-V, --version', 'Вывести текущую версию приложения');

// Команда: Приветствие
program
  .command('greet')
  .description('Приветствие пользователя (интерактивно)')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Как вас зовут?',
        default: 'Студент'
      }
    ]);
    console.log(`\n👋 Здравствуйте, ${answers.username}! Добро пожаловать в CLI-приложение.`);
    console.log(`[ИНФО] Выполнено действие: Приветствие пользователя.`);
  });

// Команда: Создание файла
program
  .command('create-file')
  .description('Создать текстовый файл (.txt) с вашим текстом')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'fileName',
          message: 'Введите имя файла (без расширения):',
          validate: input => input.trim() ? true : 'Имя файла не может быть пустым!'
        },
        {
          type: 'input',
          name: 'fileContent',
          message: 'Введите текст для сохранения в файл:'
        }
      ]);

      const fullFileName = `${answers.fileName}.txt`;
      
      // Создаем файл и записываем в него текст
      fs.writeFileSync(fullFileName, answers.fileContent);
      
      console.log(`\n✅ [УСПЕХ] Файл "${fullFileName}" успешно создан!`);
      console.log(`[ИНФО] Выполнено действие: Создание файла с расширением .txt`);
    } catch (error) {
      // Сообщение об ошибке
      console.error(`\n❌ [ОШИБКА] Не удалось создать файл. Причина: ${error.message}`);
    }
  });

// Команда: Документация
program
  .command('docs')
  .description('Вывод документации приложения')
  .action(() => {
    console.log(`
=========================================
      ДОКУМЕНТАЦИЯ ПРИЛОЖЕНИЯ
=========================================
Это консольное приложение создано в рамках Лабораторной работы №17.

Используемые модули:
- commander: для парсинга команд и аргументов командной строки.
- inquirer: для организации интерактивного диалога с пользователем.
- fs (встроенный): для работы с файловой системой.

Для просмотра всех доступных команд используйте флаг --help.
=========================================
    `);
    console.log(`[ИНФО] Выполнено действие: Просмотр документации.`);
  });

// Обработка несуществующих команд (Сообщение об ошибке)
program.on('command:*', function () {
  console.error(`\n❌ [ОШИБКА] Введена неизвестная команда: ${program.args.join(' ')}`);
  console.log(`Введите 'node index.js --help' для просмотра всех доступных команд (All).`);
  process.exit(1);
});

// Запуск парсера команд
program.parse(process.argv);

// Если приложение запущено без аргументов, автоматически выводим список всех команд (Help/All)
if (!process.argv.slice(2).length) {
  program.outputHelp();
}