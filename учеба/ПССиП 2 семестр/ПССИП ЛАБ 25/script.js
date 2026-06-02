document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ЗАДАНИЕ 1: localStorage (Настройки)
    // ==========================================
    const bgColorInput = document.getElementById('bgColor');
    const textColorInput = document.getElementById('textColor');
    const fontSizeInput = document.getElementById('fontSize');
    const resetSettingsBtn = document.getElementById('resetSettingsBtn');
    const settingsCard = document.getElementById('settings-card');

    function applySettings(bgColor, textColor, fontSize) {
        document.body.style.backgroundColor = bgColor;
        document.body.style.color = textColor;
        document.body.style.fontSize = fontSize;
        
        bgColorInput.value = bgColor;
        textColorInput.value = textColor;
        fontSizeInput.value = fontSize;
        
        // Чтобы карточка с настройками не сливалась с фоном
        settingsCard.style.backgroundColor = bgColor; 
        settingsCard.style.color = textColor;
    }

    function saveSettings() {
        const settings = {
            bgColor: bgColorInput.value,
            textColor: textColorInput.value,
            fontSize: fontSizeInput.value
        };
        localStorage.setItem('userSettings', JSON.stringify(settings));
        applySettings(settings.bgColor, settings.textColor, settings.fontSize);
    }

    bgColorInput.addEventListener('input', saveSettings);
    textColorInput.addEventListener('input', saveSettings);
    fontSizeInput.addEventListener('change', saveSettings);

    resetSettingsBtn.addEventListener('click', () => {
        localStorage.removeItem('userSettings');
        applySettings('#f3f4f6', '#1f2937', '16px'); // Сброс к дефолтным CSS
        settingsCard.style.backgroundColor = '';
        settingsCard.style.color = '';
    });

    // Загрузка при старте
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const s = JSON.parse(savedSettings);
        applySettings(s.bgColor, s.textColor, s.fontSize);
    }

    // ==========================================
    // ЗАДАНИЕ 2: sessionStorage (Список задач)
    // ==========================================
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    let tasks = [];

    function saveTasks() {
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
            `;
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Загрузка при старте
    const savedTasks = sessionStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }

    // ==========================================
    // ЗАДАНИЕ 3: Cookies (Авторизация и Язык)
    // ==========================================
    const authSection = document.getElementById('authSection');
    const greetingSection = document.getElementById('greetingSection');
    const greetingText = document.getElementById('greetingText');
    const usernameInput = document.getElementById('usernameInput');
    const langInput = document.getElementById('langInput');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    function setCookie(name, value, hours) {
        let expires = "";
        if (hours) {
            const date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function checkAuth() {
        const user = getCookie('user');
        const lang = getCookie('lang');

        if (user) {
            authSection.classList.add('hidden');
            greetingSection.classList.remove('hidden');
            greetingText.textContent = lang === 'en' ? `Welcome back, ${user}!` : `Добро пожаловать, ${user}!`;
        } else {
            authSection.classList.remove('hidden');
            greetingSection.classList.add('hidden');
        }
    }

    loginBtn.addEventListener('click', () => {
        const user = usernameInput.value.trim();
        const lang = langInput.value;
        if (user) {
            setCookie('user', user, 1); // на 1 час
            setCookie('lang', lang, 1); // на 1 час
            checkAuth();
        }
    });

    logoutBtn.addEventListener('click', () => {
        eraseCookie('user');
        eraseCookie('lang');
        checkAuth();
    });

    // Проверка при старте
    checkAuth();

    // ==========================================
    // ЗАДАНИЕ 4: File System Access API
    // ==========================================
    const openBtn = document.getElementById('openFileBtn');
    const saveBtn = document.getElementById('saveFileBtn');
    const saveAsBtn = document.getElementById('saveAsBtn');
    const textEditor = document.getElementById('textEditor');
    const fileStatus = document.getElementById('fileStatus');

    let fileHandle = null;

    const pickerOptions = {
        types: [{
            description: 'Text Files',
            accept: { 'text/plain': ['.txt', '.md', '.html', '.css', '.js'] }
        }]
    };

    openBtn.addEventListener('click', async () => {
        try {
            [fileHandle] = await window.showOpenFilePicker(pickerOptions);
            const file = await fileHandle.getFile();
            const text = await file.text();
            textEditor.value = text;
            fileStatus.textContent = `Открыт: ${file.name}`;
        } catch (error) {
            if (error.name !== 'AbortError') alert('Ошибка: ' + error.message);
        }
    });

    saveBtn.addEventListener('click', async () => {
        if (!fileHandle) {
            saveAsBtn.click(); // Если файла нет, вызываем "Сохранить как"
            return;
        }
        try {
            const writable = await fileHandle.createWritable();
            await writable.write(textEditor.value);
            await writable.close();
            fileStatus.textContent = `Сохранен: ${fileHandle.name}`;
        } catch (error) {
            alert('Ошибка при сохранении: ' + error.message);
        }
    });

    saveAsBtn.addEventListener('click', async () => {
        try {
            fileHandle = await window.showSaveFilePicker(pickerOptions);
            const writable = await fileHandle.createWritable();
            await writable.write(textEditor.value);
            await writable.close();
            fileStatus.textContent = `Новый файл: ${fileHandle.name}`;
        } catch (error) {
            if (error.name !== 'AbortError') alert('Ошибка: ' + error.message);
        }
    });

});