function findAndMarkImportant(element) {
    // 1. Проверяем наличие нужного класса у текущего элемента
    // Проверка element.classList нужна, чтобы отсеять узлы, не поддерживающие классы
    if (element.classList && element.classList.contains('important')) {
        element.classList.add('found');
    }

    // 2. Рекурсивно обходим всех прямых детей текущего элемента
    for (let i = 0; i < element.children.length; i++) {
        findAndMarkImportant(element.children[i]);
    }
}

// Запуск функции с корневого элемента
const root = document.getElementById('root');
if (root) {
    findAndMarkImportant(root);
}