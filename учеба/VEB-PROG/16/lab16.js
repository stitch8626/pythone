const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 6969;

// Middleware для парсинга JSON в теле запроса (нужно для POST и PUT)
app.use(express.json());

// Настройка Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Информационной системы мебельного центра',
            version: '1.0.0',
            description: 'Документация REST API (хэй мамбо мамбо итаалия)',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./lab16.js'], // Указываем, где искать комментарии с документацией
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
// Маршрут для страницы Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Импровизированная база данных
let items = [
    { id: 1, name: 'Офисное кресло', price: 15000 },
    { id: 2, name: 'Стол компьютерный', price: 8500 }
];

// --- ТВОЯ КОРНЕВАЯ СТРАНИЦА ---
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; padding: 20px; border: 2px solid rgb(30, 255, 0); border-radius: 10px; display: inline-block;">
            <h1 style="color:rgb(133, 13, 189);">WASAAAAAAAAAAP, Ольга Вячеславовна</h1>
            <p style="font-size: 1.2em;">Это сервер информационной системы <strong>"хэй мамбо мамбо итаалия и хэй мам"</strong>.</p>
            <p>Проект выполнен в рамках выполнения лабораторной работы, по предмету Веб-Программирование на стороне сервера.</p>
            <p><a href="/api-docs" style="color: blue; text-decoration: none; font-weight: bold;">➡️ Перейти к документации Swagger API ⬅️</a></p>
            <hr style="border: 0; border-top: 1px solid #ccc;">
            <footer style="color: #666;">Статус сервера: <span style="color: green;">Активен</span></footer>
        </div>
    `);
});

// --- REST API ENDPOINTS ---

/**
 * @swagger
 * /api/items:
 * get:
 * summary: Получить список всех товаров
 * tags: [Items]
 * responses:
 * 200:
 * description: Успешный ответ со списком товаров
 */
app.get('/api/items', (req, res) => {
    res.json(items);
});

/**
 * @swagger
 * /api/items:
 * post:
 * summary: Добавить новый товар
 * tags: [Items]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * price:
 * type: number
 * responses:
 * 201:
 * description: Товар успешно создан
 */
app.get('/api/items', (req, res) => {
    res.json(items);
}); // Дубликат убран, ниже настоящий POST

app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1, // Простая генерация ID
        name: req.body.name,
        price: req.body.price
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @swagger
 * /api/items/{id}:
 * put:
 * summary: Обновить данные товара по ID
 * tags: [Items]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID товара
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * price:
 * type: number
 * responses:
 * 200:
 * description: Товар успешно обновлен
 * 404:
 * description: Товар не найден
 */
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex !== -1) {
        items[itemIndex] = { id, ...req.body };
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

/**
 * @swagger
 * /api/items/{id}:
 * delete:
 * summary: Удалить товар по ID
 * tags: [Items]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID товара
 * responses:
 * 200:
 * description: Товар успешно удален
 * 404:
 * description: Товар не найден
 */
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен. Откройте: http://localhost:${port}`);
    console.log(`Swagger UI доступен по адресу: http://localhost:${port}/api-docs`);
});