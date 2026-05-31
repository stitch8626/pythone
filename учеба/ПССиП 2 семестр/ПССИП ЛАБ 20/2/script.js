const mainList = document.getElementById('main-list');

// Перебираем только прямых потомков (элементы <li> верхнего уровня)
for (let i = 0; i < mainList.children.length; i++) {
    const li = mainList.children[i];
    li.style.color = 'blue';

    // Предотвращаем наследование синего цвета вложенными списками
    const nestedUl = li.firstElementChild; 
    if (nestedUl && nestedUl.tagName === 'UL') {
        nestedUl.style.color = 'initial'; // Сбрасываем цвет на исходный
    }
}