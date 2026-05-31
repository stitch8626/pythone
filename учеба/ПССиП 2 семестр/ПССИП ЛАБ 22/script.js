// Задание 1
const btn1 = document.getElementById('task1-btn');
const span1 = document.getElementById('task1-span');
let count = 0;

btn1.addEventListener('click', () => {
    count++;
    span1.textContent = count;
});

// Задание 2
const div2 = document.getElementById('task2-div');

// mouseenter срабатывает, когда курсор входит в область элемента
div2.addEventListener('mouseenter', () => {
    div2.style.backgroundColor = 'lightgreen';
});

// mouseleave срабатывает, когда курсор уходит
div2.addEventListener('mouseleave', () => {
    div2.style.backgroundColor = ''; // Пустая строка возвращает исходный цвет
});

// Задание 3
const input3 = document.getElementById('task3-input');
const output3 = document.getElementById('task3-output');

// Событие 'input' срабатывает при каждом изменении текста в поле
input3.addEventListener('input', (event) => {
    output3.textContent = event.target.value; 
});

// Задание 4
const btn4 = document.getElementById('task4-btn');
const div4 = document.getElementById('task4-div');

btn4.addEventListener('click', () => {
    // Проверяем текущее состояние и переключаем
    if (div4.style.display === 'none') {
        div4.style.display = 'block';
    } else {
        div4.style.display = 'none';
    }
});

// Задание 5
const form5 = document.getElementById('task5-form');
const emailInput5 = document.getElementById('task5-email');
const errorMsg5 = document.getElementById('task5-error');

form5.addEventListener('submit', (event) => {
    // Получаем текст, который ввели
    const emailValue = emailInput5.value;

    // Метод includes() проверяет, есть ли подстрока (в нашем случае "@") в строке
    if (!emailValue.includes('@')) {
        // Если "@" нет, останавливаем стандартную отправку формы
        event.preventDefault(); 
        errorMsg5.textContent = 'Ошибка: Email должен содержать символ "@"!';
    } else {
        // Если все ок, убираем ошибку (форма отправится, страница перезагрузится)
        errorMsg5.textContent = '';
    }
});