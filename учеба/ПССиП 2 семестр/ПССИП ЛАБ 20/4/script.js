const nextButton = document.querySelector('.next');

// По логике предоставленного HTML, нужный <div> стоит ПЕРЕД кнопкой
const targetElement = nextButton.previousElementSibling; 

// Если преподаватель требует строго следовать тексту ("следующий"):
// const targetElement = nextButton.nextElementSibling;

if (targetElement) {
    // Добавляем/изменяем атрибут
    targetElement.setAttribute('data-target', 'newItem');