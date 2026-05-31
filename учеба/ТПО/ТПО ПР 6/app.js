const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Простой логгер запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// База данных: Тикеты (Баг-трекер)
let tickets = [
    { id: 1, title: 'Пофиксить баг с авторизацией', status: 'open', severity: 'critical', category: 'backend' },
    { id: 2, title: 'Настроить плагины на сервере Rust', status: 'closed', severity: 'high', category: 'devops' },
    { id: 3, title: 'Обновить драйвера на видеокарту', status: 'open', severity: 'low', category: 'hardware' },
    { id: 4, title: 'Сверстать темную тему', status: 'in_progress', severity: 'medium', category: 'frontend' },
    { id: 5, title: 'Оптимизировать SQL запросы', status: 'open', severity: 'high', category: 'backend' }
];

// ===================================================
// КОНФИГУРАЦИЯ SWAGGER (С МЕТОДОМ PUT)
// ===================================================
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Система отслеживания багов (Bug Tracker)',
        description: 'API для управления тикетами проекта. \n\n**Реализованы аннотации кодов ответа: 200 OK, 400 Bad Request, 404 Not Found.**',
        version: '2.0.0'
    },
    servers: [{ url: 'http://localhost:67' }],
    paths: {
        '/api/tickets': {
            get: {
                summary: '1. Получить все тикеты',
                responses: { 200: { description: 'Успешный ответ (OK)' } }
            },
            post: {
                summary: 'Создать новый баг-репорт',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['title'],
                                properties: {
                                    title: { type: 'string', example: 'Не работает кнопка Login' },
                                    severity: { type: 'string', example: 'high' },
                                    category: { type: 'string', example: 'frontend' }
                                }
                            }
                        }
                    }
                },
                responses: { 
                    201: { description: 'Успешно создано (Created)' },
                    400: { description: 'Неверный запрос - отсутствует обязательное поле title (Bad Request)' }
                }
            }
        },
        '/api/tickets/{id}': {
            get: {
                summary: '2. Найти тикет по ID',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: { 
                    200: { description: 'Успешный ответ (OK)' },
                    400: { description: 'Неверный формат ID (Bad Request)' },
                    404: { description: 'Тикет не найден (Not Found)' } 
                }
            },
            // [НОВОЕ] Аннотация для PUT запроса
            put: {
                summary: 'Обновить данные тикета по ID',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string', example: 'Обновленное название бага' },
                                    status: { type: 'string', example: 'in_progress' },
                                    severity: { type: 'string', example: 'critical' },
                                    category: { type: 'string', example: 'backend' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Тикет успешно обновлен (OK)' },
                    400: { description: 'Неверный формат ID или пустые данные (Bad Request)' },
                    404: { description: 'Тикет не найден (Not Found)' }
                }
            },
            delete: {
                summary: 'Удалить тикет (закрыть навсегда)',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: { 
                    200: { description: 'Успешно удалено (OK)' },
                    400: { description: 'Неверный формат ID (Bad Request)' },
                    404: { description: 'Тикет не найден (Not Found)' }
                }
            }
        },
        '/api/tickets/status/open': {
            get: { summary: '3. Показать только открытые тикеты', responses: { 200: { description: 'Успешно' } } }
        },
        '/api/tickets/status/closed': {
            get: { summary: '4. Показать только решенные тикеты', responses: { 200: { description: 'Успешно' } } }
        },
        '/api/tickets/severity/{level}': {
            get: {
                summary: '5. Поиск тикетов по уровню критичности',
                parameters: [{ name: 'level', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 200: { description: 'Успешно' } }
            }
        },
        '/api/tickets/category/backend': {
            get: { summary: '6. Тикеты категории Backend', responses: { 200: { description: 'Успешно' } } }
        },
        '/api/tickets/category/frontend': {
            get: { summary: '7. Тикеты категории Frontend', responses: { 200: { description: 'Успешно' } } }
        },
        '/api/tickets/stats': {
            get: { summary: '8. Аналитика проекта', responses: { 200: { description: 'Успешно' } } }
        }
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ===================================================
// ЛОГИКА ЭНДПОИНТОВ БЭКЕНДА
// ===================================================

app.get('/api/tickets', (req, res) => res.status(200).json(tickets));

app.post('/api/tickets', (req, res) => {
    const { title, severity, category } = req.body;
    if (!title) {
        return res.status(400).json({ error: '400 Bad Request: Название баг-репорта обязательно' });
    }

    const newTicket = { id: Date.now(), title, status: 'open', severity: severity || 'medium', category: category || 'general' };
    tickets.push(newTicket);
    res.status(201).json(newTicket);
});

app.get('/api/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: '400 Bad Request: ID должен быть числом' });

    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return res.status(404).json({ error: '404 Not Found: Тикет не найден' });
    
    res.status(200).json(ticket);
});

// [НОВОЕ] Логика для PUT-запроса (Обновление тикета)
app.put('/api/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    // Проверка 400: Если ID не число
    if (isNaN(id)) {
        return res.status(400).json({ error: '400 Bad Request: ID должен быть числом' });
    }

    const ticketIndex = tickets.findIndex(t => t.id === id);
    
    // Проверка 404: Если тикет не найден в базе
    if (ticketIndex === -1) {
        return res.status(404).json({ error: '404 Not Found: Тикет для обновления не найден' });
    }

    const { title, status, severity, category } = req.body;

    // Проверка 400: Если прислали пустое поле title
    if (req.body.hasOwnProperty('title') && !title) {
        return res.status(400).json({ error: '400 Bad Request: Поле title не может быть пустым' });
    }

    // Обновляем только те поля, которые были переданы в запросе
    tickets[ticketIndex] = {
        ...tickets[ticketIndex],
        title: title !== undefined ? title : tickets[ticketIndex].title,
        status: status !== undefined ? status : tickets[ticketIndex].status,
        severity: severity !== undefined ? severity : tickets[ticketIndex].severity,
        category: category !== undefined ? category : tickets[ticketIndex].category
    };

    // Возвращаем обновленный тикет и код 200 OK
    res.status(200).json(tickets[ticketIndex]);
});

app.delete('/api/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: '400 Bad Request: ID должен быть числом' });

    const ticketIndex = tickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) return res.status(404).json({ error: '404 Not Found: Тикет для удаления не найден' });

    tickets.splice(ticketIndex, 1);
    res.status(200).json({ success: true, message: 'Удалено' });
});

// Остальные GET-запросы
app.get('/api/tickets/status/open', (req, res) => res.status(200).json(tickets.filter(t => t.status === 'open')));
app.get('/api/tickets/status/closed', (req, res) => res.status(200).json(tickets.filter(t => t.status === 'closed')));
app.get('/api/tickets/severity/:level', (req, res) => res.status(200).json(tickets.filter(t => t.severity === req.params.level.toLowerCase())));
app.get('/api/tickets/category/backend', (req, res) => res.status(200).json(tickets.filter(t => t.category === 'backend')));
app.get('/api/tickets/category/frontend', (req, res) => res.status(200).json(tickets.filter(t => t.category === 'frontend')));
app.get('/api/tickets/stats', (req, res) => {
    res.status(200).json({
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        closed: tickets.filter(t => t.status === 'closed').length,
        critical: tickets.filter(t => t.severity === 'critical').length
    });
});

// ===================================================
// ФРОНТЕНД
// ===================================================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Bug Tracker Panel</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 40px auto; padding: 20px; background: #1e1e2e; color: #cdd6f4; }
                h1 { color: #89b4fa; text-align: center; }
                .form-group { margin-bottom: 20px; display: flex; gap: 10px; }
                input { flex: 1; padding: 12px; border: 1px solid #45475a; border-radius: 6px; background: #313244; color: #cdd6f4; outline: none; }
                button { padding: 12px 20px; border: none; background: #89b4fa; color: #11111b; border-radius: 6px; cursor: pointer; font-weight: bold; transition: 0.2s; }
                button:hover { background: #b4befe; }
                button.delete-btn { background: #f38ba8; color: #11111b; padding: 6px 12px; font-size: 0.9em; }
                button.delete-btn:hover { background: #eba0ac; }
                ul { list-style: none; padding: 0; }
                li { background: #313244; padding: 15px; margin-bottom: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border-left: 5px solid #a6e3a1; }
                .ticket-info { display: flex; flex-direction: column; gap: 5px; }
                .badge { font-size: 0.8em; background: #45475a; padding: 3px 8px; border-radius: 12px; width: fit-content; }
                .links { margin-top: 30px; border-top: 1px solid #45475a; padding-top: 20px; text-align: center; }
                a { color: #f9e2af; text-decoration: none; font-weight: bold; font-size: 1.2em; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <h1>🐛 Bug Tracker Dashboard</h1>
            <div class="form-group">
                <input type="text" id="ticketTitle" placeholder="Опишите новый баг или задачу...">
                <button onclick="addTicket()">Создать тикет</button>
            </div>
            <ul id="ticketList"></ul>
            <div class="links">
                <a href="/api-docs" target="_blank">⚡ Открыть документацию Swagger API</a>
            </div>

            <script>
                const API_URL = '/api/tickets';

                async function loadTickets() {
                    const res = await fetch(API_URL);
                    const data = await res.json();
                    const list = document.getElementById('ticketList');
                    list.innerHTML = '';
                    
                    data.forEach(ticket => {
                        const li = document.createElement('li');
                        li.innerHTML = \`
                            <div class="ticket-info">
                                <strong>\${ticket.title}</strong>
                                <span class="badge">Статус: \${ticket.status} | \${ticket.category} | \${ticket.severity}</span>
                            </div>
                            <button class="delete-btn" onclick="deleteTicket(\${ticket.id})">Закрыть</button>
                        \`;
                        list.appendChild(li);
                    });
                }

                async function addTicket() {
                    const input = document.getElementById('ticketTitle');
                    if (!input.value.trim()) return alert('Введите описание бага!');

                    await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            title: input.value, 
                            severity: 'medium', 
                            category: 'dev' 
                        })
                    });

                    input.value = '';
                    loadTickets();
                }

                async function deleteTicket(id) {
                    await fetch(\`\${API_URL}/\${id}\`, { method: 'DELETE' });
                    loadTickets();
                }

                loadTickets();
            </script>
        </body>
        </html>
    `);
});

const PORT = 67;
app.listen(PORT, () => {
    console.log(`🚀 Баг-трекер запущен на порту ${PORT}`);
    console.log(`🖥️  Главная страница (Фронтенд): http://localhost:${PORT}`);
    console.log(`📖 Swagger API: http://localhost:${PORT}/api-docs`);
});