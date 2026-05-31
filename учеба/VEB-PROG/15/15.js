// Подключаем установленный модуль Koa
const Koa = require('koa');

// Создаем экземпляр приложения (наш сервер)
const app = new Koa();

// Используем middleware (промежуточный обработчик) для обработки всех запросов
app.use(async ctx => {
  
  // Обработка корневой страницы "/"
  if (ctx.path === '/') {
    ctx.status = 200; // Статус "Успешно"
    ctx.type = 'html'; // Указываем, что отправляем HTML
    ctx.body = '<h1>Здравствуйте,Ольга Вячеславовная [а вы еще не болете Хантавирусом?]!</h1><p>Лабораторная работа №15 успешно выполнена.</p>';
  } 
  
  // Обработка страницы "/404" (для отметки 6-9)
  else if (ctx.path === '/404') {
    ctx.status = 404; // Статус "Не найдено"
    ctx.type = 'html';
    // Отправляем HTML-код со встроенным CSS для красивого оформления
    ctx.body = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>Ошибка 404</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background-color: #2c3e50; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0; 
          }
          .error-card { 
            text-align: center; 
            padding: 50px; 
            background: #ecf0f1; 
            border-radius: 15px; 
            box-shadow: 0 10px 20px rgba(0,0,0,0.3); 
          }
          h1 { 
            color: #e74c3c; 
            font-size: 80px; 
            margin: 0; 
          }
          p { 
            color: #34495e; 
            font-size: 20px; 
            margin-bottom: 30px;
          }
          .btn { 
            padding: 12px 25px; 
            background-color: #3498db; 
            color: white; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold;
            transition: background 0.3s;
          }
          .btn:hover {
            background-color: #2980b9;
          }
        </style>
      </head>
      <body>
        <div class="error-card">
          <h1>404</h1>
          <p>Упс! Запрашиваемая страница не существует.</p>
          <a href="/" class="btn">Вернуться на главную</a>
        </div>
      </body>
      </html>
    `;
  } 
  
  // Если ввели любой другой адрес, перенаправляем на "/404"
  else {
    ctx.redirect('/404');
  }
});

// Запускаем сервер на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен. Открой в браузере: http://localhost:3000');
});