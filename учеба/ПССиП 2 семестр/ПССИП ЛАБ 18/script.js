document.addEventListener('DOMContentLoaded', () => {

    // --- ЗАДАНИЕ 1: navigator и screen ---
    const browserField = document.getElementById('browser-info');
    const osField = document.getElementById('os-info');
    const screenField = document.getElementById('screen-info');

    // Название и версия
    browserField.textContent = navigator.userAgent;
    // Платформа
    osField.textContent = navigator.platform;
    // Разрешение экрана
    screenField.textContent = `${screen.width} x ${screen.height} px`;


    // --- ЗАДАНИЕ 2: history и location ---
    // Кнопки истории
    document.getElementById('btn-back').addEventListener('click', () => {
        window.history.back();
    });

    document.getElementById('btn-forward').addEventListener('click', () => {
        window.history.forward();
    });

    // Переход по URL
    document.getElementById('btn-go').addEventListener('click', () => {
        const url = document.getElementById('url-input').value;
        if (url) {
            // Если пользователь забыл протокол, добавляем его
            const targetUrl = url.startsWith('http') ? url : 'https://' + url;
            window.location.href = targetUrl;
        } else {
            alert('Пожалуйста, введите URL-адрес');
        }
    });


    // --- ЗАДАНИЕ 3: window.open ---
    // Простое новое окно
    document.getElementById('btn-open-simple').addEventListener('click', () => {
        const newWin = window.open('', '_blank');
        newWin.document.write('<html><head><title>Новое окно</title></head><body><h1>Привет из нового окна!</h1></body></html>');
    });

    // Окно заданного размера
    document.getElementById('btn-open-sized').addEventListener('click', () => {
        const features = 'width=500,height=400,left=200,top=200';
        const sizedWin = window.open('', '_blank', features);
        sizedWin.document.write(`
            <html>
                <head><title>Размерное окно</title></head>
                <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                    <h2>Привет!</h2>
                    <p>Это окно размером 500x400</p>
                    <button onclick="window.close()">Закрыть меня</button>
                </body>
            </html>
        `);
    });

});