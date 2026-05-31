document.addEventListener('DOMContentLoaded', () => {

    // ================= Задание 1: Изменение кнопки =================
    const myButton = document.getElementById('myButton');
    
    // При клике меняем текст и стили
    myButton.addEventListener('click', () => {
        myButton.textContent = 'Кнопка нажата!';
        myButton.style.backgroundColor = 'green';
        myButton.style.color = 'white';
    });


    // ================= Задание 2: Добавление в список =================
    const myList = document.getElementById('myList');
    const newItemText = document.getElementById('newItemText');
    const addItemBtn = document.getElementById('addItemBtn');

    addItemBtn.addEventListener('click', () => {
        // Получаем текст и убираем лишние пробелы по краям
        const textValue = newItemText.value.trim(); 
        
        // Добавляем, только если поле не пустое
        if (textValue !== '') {
            const newLi = document.createElement('li'); // Создаем тег <li>
            newLi.textContent = textValue;              // Записываем в него текст
            myList.appendChild(newLi);                  // Вставляем <li> в конец списка <ul>
            newItemText.value = '';                     // Очищаем поле ввода
        }
    });


    // ================= Задание 3: Удаление из списка =================
    // Находим все элементы <span> с классом (крестики для удаления)
    const removeBtns = document.querySelectorAll('.remove-btn');

    // Проходимся по каждому найденному крестику
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // parentElement указывает на родительский тег (в нашем случае это <li>)
            // Вызываем метод remove(), чтобы удалить этот <li> со страницы
            btn.parentElement.remove(); 
        });
    });


    // ================= Задание 4: Смена изображения =================
    const myImage = document.getElementById('myImage');
    
    // Сохраняем исходный путь к картинке (image1.jpg) в переменную
    // Это нужно, чтобы знать, к чему возвращаться, когда уберем мышку
    const originalSrc = myImage.getAttribute('src');

    // Событие: наведение мыши на картинку
    myImage.addEventListener('mouseover', () => {
        // Получаем путь ко второй картинке из атрибута data-alt-src (image2.jpg)
        const altSrc = myImage.getAttribute('data-alt-src');
        // Заменяем текущую картинку на вторую
        myImage.setAttribute('src', altSrc);
    });

    // Событие: увод курсора мыши с картинки
    myImage.addEventListener('mouseout', () => {
        // Возвращаем исходную картинку (image1.jpg)
        myImage.setAttribute('src', originalSrc);
    });


    // ================= Задание 5: Динамическая таблица =================
    const tableContainer = document.getElementById('tableContainer');
    const data = [
        { name: 'Иван', age: 30, city: 'Минск' },
        { name: 'Петр', age: 25, city: 'Брест' },
        { name: 'Анна', age: 35, city: 'Гродно' }
    ];

    // Создаем элемент <table> и добавляем ему класс для CSS
    const table = document.createElement('table');
    table.classList.add('data-table');

    // 1. Создаем шапку таблицы (thead)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Берем ключи из первого объекта массива (name, age, city), чтобы сделать из них заголовки
    const keys = Object.keys(data[0]); 
    keys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 2. Создаем тело таблицы (tbody)
    const tbody = document.createElement('tbody');
    
    // Перебираем каждый объект (человека) в массиве data
    data.forEach(obj => {
        const tr = document.createElement('tr'); // Создаем строку для человека
        
        // Перебираем ключи, чтобы вытащить значения (Иван, 30, Минск) и вставить их в ячейки
        keys.forEach(key => {
            const td = document.createElement('td'); // Создаем ячейку
            td.textContent = obj[key];               // Записываем в ячейку данные
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr); // Добавляем строку в тело таблицы
    });
    table.appendChild(tbody);

    // 3. Вставляем готовую собранную таблицу в <div> на странице
    tableContainer.appendChild(table);

});