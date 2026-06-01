import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';

const program = new Command();

// --- НАСТРОЙКА БАЗОВОЙ ИНФОРМАЦИИ (Версия и Документация) ---
program
  .name('lab17-cli')
  .description('Документация: CLI-приложение для создания текстовых файлов и приветствия пользователей. Разработано для Лабораторной работы №17.')
  .version('1.0.0', '-V, --version', 'Вывести текущую версию приложения');

// --- 1. ПРИВЕТСТВИЕ ПОЛЬЗОВАТЕЛЯ ---
program
  .command('greet')
  .description('Поприветствовать пользователя (интерактивный режим)')
  .action(async () => {
    // Используем inquirer для общения с пользователем в консоли
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Как вас зовут?',
        default: 'Студент'
      }
    ]);
    
    console.log(`\n👋 Здравствуйте, ${answers.username}! Добро пожаловать в CLI-приложение.`);
  });

// --- 2. СОЗДАНИЕ ФАЙЛА .txt ---
program
  .command('create')
  .description('Создать текстовый файл с расширением .txt')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'filename',
          message: 'Введите имя файла (без расширения .txt):',
          validate: input => input ? true : 'Имя файла не может быть пустым!'
        },
        {
          type: 'input',
          name: 'content',
          message: 'Введите текст, который нужно записать в файл:'
        }
      ]);

      const fullFileName = `${answers.filename}.txt`;
      // Синхронная запись в файл с помощью встроенного модуля fs
      fs.writeFileSync(fullFileName, answers.content, 'utf-8');
      
      console.log(`\n🎉 Файл "${fullFileName}" успешно создан!`);
    } catch (error) {
      // Сообщение об ошибке (например, если нет прав на запись)
      console.error(`\n Системная ошибка при создании файла: ${error.message}\n`);
    }
  });

// --- 3. ВЫВЕСТИ ВСЕ КОМАНДЫ (All) ---
program
  .command('all')
  .description('Вывести список всех пользовательских команд')
  .action(() => {
    console.log('\n📋 СПИСОК ВСЕХ КОМАНД ПРИЛОЖЕНИЯ:');
    console.log('-----------------------------------');
    console.log('  greet   -> Запустить интерактивное приветствие');
    console.log('  create  -> Интерактивно создать файл .txt');
    console.log('  all     -> Показать этот список (пользовательский)');
    console.log('  --help  -> Показать стандартную справку Commander');
    console.log('  -V      -> Показать версию приложения');
    console.log('-----------------------------------');
  });

// --- 4. СООБЩЕНИЕ ОБ ОШИБКЕ (Обработка неизвестных команд) ---
program.on('command:*', function (operands) {
  console.error(`\n❌ ОШИБКА: Команда '${operands[0]}' не найдена!`);
  console.log('Введите "node index.js --help" для просмотра доступных команд.\n');
  process.exitCode = 1;
});

// --- 5. ВЫЗОВ HELP ПРИ ПУСТОМ ЗАПУСКЕ ---
// Если пользователь просто написал `node index.js` без команд
if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  // Парсинг введенных аргументов
  program.parse(process.argv);
}