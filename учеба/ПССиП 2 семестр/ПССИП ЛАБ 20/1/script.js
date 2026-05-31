// Задание 1: Навигация по DOM
function task1() {
    const grandparent = document.getElementById('grandparent');
    // grandparent -> первая div.parent -> её первый ребенок <p>
    const child1 = grandparent.firstElementChild.firstElementChild;
    alert(child1.innerText);
}

// Задание 2: Прямые потомки списка
function task2() {
    const list = document.getElementById('main-list');
    const directItems = list.children; // Только прямые <li>
    
    for (let item of directItems) {
        if (item.tagName === 'LI') {
            item.style.color = 'blue';
        }
    }
}

// Задание 3: Подсчет элементов <p> внутри <article>
function task3() {
    const article = document.querySelector('article');
    const pCount = article.getElementsByTagName('p').length;
    alert('Найдено абзацев <p>: ' + pCount);
}

// Задание 4: Работа с атрибутами и соседями
function task4() {
    const nextBtn = document.querySelector('.control.next');
    const nextElement = nextBtn.nextElementSibling;
    
    if (nextElement) {
        nextElement.setAttribute('data-target', 'newItem');
        nextElement.style.background = '#d4edda'; // Подсветка для наглядности
        console.log('Новый атрибут:', nextElement.getAttribute('data-target'));
    }
}

// Задание 5: Рекурсивная функция поиска
function task5() {
    const root = document.getElementById('root');

    function findAndMarkImportant(element) {
        // Если у элемента есть класс important, добавляем found
        if (element.classList && element.classList.contains('important')) {
            element.classList.add('found');
        }

        // Рекурсивный вызов для всех детей
        let child = element.firstElementChild;
        while (child) {
            findAndMarkImportant(child);
            child = child.nextElementSibling;
        }
    }

    findAndMarkImportant(root);
}