const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Простейшая настройка Swagger (базовый документ)
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Моя Лабораторная API',
    version: '1.0.0',
    description: 'API для лабораторной работы №20'
  },
  paths: {
    // Тестовый GET-запрос для Swagger
    '/api/ping': {
      get: {
        summary: 'Проверка работы сервера',
        responses: {
          '200': { description: 'Сервер работает отлично!' }
        }
      }
    }
  }
};

// 2. Подключаем Swagger UI по адресу /swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 3. Раздаем ваши статические файлы (HTML, CSS, JS) из текущей папки
app.use(express.static(__dirname));

// 4. Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен!`);
  console.log(`🌐 Лабораторная: http://localhost:${PORT}`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/swagger`);
});