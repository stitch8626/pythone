// ==========================================
// Задание 1: Плавное появление (opacity)
// ==========================================
const box1 = document.getElementById('task1-box');
const btn1 = document.getElementById('task1-btn');

btn1.addEventListener('click', () => {
    // Сбрасываем прозрачность
    box1.style.opacity = 0;
    
    let startTimestamp = null;
    const duration = 2000; // 2 секунды

    // Функция отрисовки кадра
    const fadeIn = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        
        // Вычисляем текущую прозрачность от 0 до 1
        box1.style.opacity = Math.min(progress / duration, 1);

        // Если 2 секунды еще не прошли, запрашиваем следующий кадр
        if (progress < duration) {
            window.requestAnimationFrame(fadeIn);
        }
    };

    // Запуск анимации
    window.requestAnimationFrame(fadeIn);
});

// ==========================================
// Задание 2: Циклическое изменение цвета
// ==========================================
const box2 = document.getElementById('task2-box');
const btn2 = document.getElementById('task2-btn');
const colors = ['#dc3545', '#28a745', '#007bff']; // Красный, Зеленый, Синий
let colorIndex = 0;
let colorInterval;
let isColorChanging = false;

btn2.addEventListener('click', () => {
    if (isColorChanging) {
        clearInterval(colorInterval);
    } else {
        // Меняем цвет каждые 1.5 секунды (совпадает с временем transition в CSS)
        colorInterval = setInterval(() => {
            box2.style.backgroundColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 1500);
    }
    isColorChanging = !isColorChanging;
});

// ==========================================
// Задание 3: Горизонтальное перемещение
// ==========================================
const box3 = document.getElementById('task3-box');
const btn3 = document.getElementById('task3-btn');
const speedInput = document.getElementById('speed-input');
let animationId3;

btn3.addEventListener('click', () => {
    cancelAnimationFrame(animationId3); // Сбрасываем, если анимация уже идет
    
    let currentPos = 0;
    const speed = parseFloat(speedInput.value) || 2;
    // Максимальная дистанция: ширина контейнера минус ширина самого блока
    const maxDistance = box3.parentElement.clientWidth - box3.offsetWidth;

    const moveRight = () => {
        currentPos += speed;
        
        if (currentPos >= maxDistance) {
            currentPos = maxDistance; // Фиксируем на краю
            box3.style.transform = `translateX(${currentPos}px)`;
            return; // Останавливаем анимацию
        }
        
        box3.style.transform = `translateX(${currentPos}px)`;
        animationId3 = window.requestAnimationFrame(moveRight);
    };

    window.requestAnimationFrame(moveRight);
});

// ==========================================
// Задание 4: Масштаб и прозрачность
// ==========================================
const box4 = document.getElementById('task4-box');
const btn4 = document.getElementById('task4-btn');
let isBox4Toggled = false;

btn4.addEventListener('click', () => {
    if (!isBox4Toggled) {
        // Увеличиваем в 1.5 раза и делаем полупрозрачным
        box4.style.transform = 'scale(1.5)';
        box4.style.opacity = '0.3';
    } else {
        // Возвращаем в исходное состояние
        box4.style.transform = 'scale(1)';
        box4.style.opacity = '1';
    }
    isBox4Toggled = !isBox4Toggled;
});

// ==========================================
// Задание 5: Последовательность преобразований
// ==========================================
const box5 = document.getElementById('task5-box');
const btn5 = document.getElementById('task5-btn');

// Вспомогательная функция для паузы между анимациями (используем Promise)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

btn5.addEventListener('click', async () => {
    btn5.disabled = true; // Блокируем кнопку, чтобы не нажимали спамом
    
    const maxDistance = box5.parentElement.clientWidth - box5.offsetWidth;

    // Шаг 1: Перемещает элемент вправо
    box5.style.transform = `translateX(${maxDistance}px)`;
    await sleep(1000); // Ждем 1 секунду (время выполнения transition в CSS)

    // Шаг 2: Изменяет его цвет фона
    box5.style.backgroundColor = '#ffc107'; // Желтый
    await sleep(1000);

    // Шаг 3: Уменьшает его размер (сохраняя сдвиг вправо!)
    box5.style.transform = `translateX(${maxDistance}px) scale(0.5)`;
    await sleep(1000);

    // Шаг 4: Возвращает его в исходное положение (сбрасываем стили)
    box5.style.transform = 'translateX(0) scale(1)';
    box5.style.backgroundColor = ''; 
    await sleep(1000);

    btn5.disabled = false; // Разблокируем кнопку
});