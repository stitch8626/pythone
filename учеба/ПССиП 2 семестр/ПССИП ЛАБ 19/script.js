document.addEventListener('DOMContentLoaded', () => {

  // --- Задание 1 ---
  document.getElementById('btn-task1').addEventListener('click', () => {
      const title = document.getElementById('main-title');
      title.textContent = "Новый заголовок страницы";

      const paragraph = document.getElementsByTagName('p')[0]; // Берем первый абзац на странице
      paragraph.textContent = "Это новый текст абзаца, сгенерированный с помощью JavaScript!";
  });

  // --- Задание 2 ---
  document.getElementById('btn-task2').addEventListener('click', () => {
      const listItems = document.getElementsByClassName('list-item');
      const outputDiv = document.getElementById('task2-output');
      
      let texts = [];
      // Получаем и выводим текст
      for (let i = 0; i < listItems.length; i++) {
          texts.push(listItems[i].textContent);
      }
      outputDiv.innerHTML = "<strong>Текст элементов:</strong><br>" + texts.join('<br>');

      // Добавляем восклицательный знак
      for (let i = 0; i < listItems.length; i++) {
          // Проверка, чтобы не добавлять бесконечное количество знаков при повторных кликах
          if (!listItems[i].textContent.endsWith('!')) {
              listItems[i].textContent += "!";
          }
      }
  });

  // --- Задание 3 ---
  document.getElementById('btn-task3').addEventListener('click', () => {
      const img = document.getElementsByTagName('img')[0];
      
      // Используем протокол file:/// и прямые слеши для корректной работы абсолютного пути в браузере
      img.setAttribute('src', 'file:///C:/pythone/ПССиП 2 семестр/ПССИП ЛАБ 19/владик.png');
      img.setAttribute('alt', 'Новое изображение');
  });

  // --- Задание 4 ---
  document.getElementById('btn-task4').addEventListener('click', () => {
      const div = document.getElementById('timeout-div');
      const btn = document.getElementById('btn-task4');
      
      // Добавляем класс
      div.classList.add('highlight');
      div.textContent = "Класс highlight добавлен! Ждем 3 секунды...";
      btn.disabled = true; // Блокируем кнопку на время таймера

      // Удаляем через 3 секунды
      setTimeout(() => {
          div.classList.remove('highlight');
          div.textContent = "Класс удален. Блок вернулся в исходное состояние.";
          btn.disabled = false; // Разблокируем кнопку
      }, 3000);
  });

  // --- Задание 5 ---
  document.getElementById('btn-task5').addEventListener('click', () => {
      const container = document.getElementById('empty-container');
      
      // Очищаем контейнер перед добавлением, чтобы параграфы не плодились бесконечно
      container.innerHTML = ''; 

      const newP = document.createElement('p');
      newP.textContent = "Этот параграф был создан динамически с помощью JavaScript!";
      newP.classList.add('dynamic-text');
      
      container.appendChild(newP);
  });

});