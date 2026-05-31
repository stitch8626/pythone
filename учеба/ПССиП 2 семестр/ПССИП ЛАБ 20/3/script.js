const article = document.querySelector('article');

// Ищем все элементы <p> строго внутри найденного <article>
const paragraphs = article.querySelectorAll('p'); 

alert(`Количество абзацев: ${paragraphs.length}`);