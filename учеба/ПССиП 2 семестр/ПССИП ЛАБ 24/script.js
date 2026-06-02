document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    // Поля формы
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const age = document.getElementById('age');
    const quantity = document.getElementById('quantity');

    // Регулярные выражения
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Вспомогательная функция: Показать ошибку
    const showError = (input, message) => {
        input.classList.add('error-border');
        // Ищем контейнер с ошибкой (он лежит сразу после input или после .input-wrapper)
        const errorText = input.closest('.form-group').querySelector('.error-text');
        errorText.textContent = message;
        errorText.style.display = 'block';

        // Обновление иконки для 4 задания
        const icon = input.closest('.form-group').querySelector('.status-icon');
        if (icon) {
            icon.textContent = '❌';
            icon.style.display = 'inline';
        }
    };

    // Вспомогательная функция: Очистить ошибку
    const clearError = (input) => {
        input.classList.remove('error-border');
        const errorText = input.closest('.form-group').querySelector('.error-text');
        errorText.style.display = 'none';
        errorText.textContent = '';
    };

    // Вспомогательная функция: Показать успех (для 4 задания)
    const showSuccess = (input) => {
        clearError(input);
        const icon = input.closest('.form-group').querySelector('.status-icon');
        if (icon) {
            icon.textContent = '✅';
            icon.style.display = 'inline';
        }
    };

    // === Задание 1: Очистка ошибок при вводе ===
    const allInputs = form.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });

    // === Задание 4: Валидация в реальном времени (Email и Password) ===
    const validateEmailRealTime = () => {
        if (!email.value.trim()) {
            showError(email, "Это поле обязательно для заполнения");
            return false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, "Некорректный формат email");
            return false;
        } else {
            showSuccess(email);
            return true;
        }
    };

    const validatePasswordRealTime = () => {
        if (!password.value.trim()) {
            showError(password, "Это поле обязательно для заполнения");
            return false;
        } else if (!passwordRegex.test(password.value)) {
            showError(password, "Минимум 8 символов, 1 заглавная, 1 строчная и 1 цифра");
            return false;
        } else {
            showSuccess(password);
            return true;
        }
    };

    // Привязываем события onblur и oninput для email и пароля
    ['blur', 'input'].forEach(evt => {
        email.addEventListener(evt, validateEmailRealTime);
        password.addEventListener(evt, validatePasswordRealTime);
    });

    // === Основная функция валидации при отправке ===
    form.addEventListener('submit', (event) => {
        // Задание 1: Предотвращение стандартной отправки
        event.preventDefault();
        
        let isValid = true;

        // Валидация Имени
        if (!firstName.value.trim()) {
            showError(firstName, "Это поле обязательно для заполнения");
            isValid = false;
        }

        // Валидация Фамилии
        if (!lastName.value.trim()) {
            showError(lastName, "Это поле обязательно для заполнения");
            isValid = false;
        }

        // Валидация Email (используем функцию из 4 задания)
        if (!validateEmailRealTime()) isValid = false;

        // Валидация Пароля (используем функцию из 4 задания)
        if (!validatePasswordRealTime()) isValid = false;

        // Задание 2: Валидация подтверждения пароля
        if (!confirmPassword.value.trim()) {
            showError(confirmPassword, "Это поле обязательно для заполнения");
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Пароли не совпадают");
            isValid = false;
        }

        // Задание 3: Валидация возраста
        if (!age.value.trim()) {
            showError(age, "Это поле обязательно для заполнения");
            isValid = false;
        } else {
            const ageNum = parseInt(age.value, 10);
            if (isNaN(ageNum) || ageNum < 18 || ageNum > 99) {
                showError(age, "Возраст должен быть от 18 до 99 лет");
                isValid = false;
            }
        }

        // Задание 3: Валидация количества товаров
        if (!quantity.value.trim()) {
            showError(quantity, "Это поле обязательно для заполнения");
            isValid = false;
        } else {
            const qtyNum = parseInt(quantity.value, 10);
            if (isNaN(qtyNum) || qtyNum <= 0) {
                showError(quantity, "Количество должно быть больше 0");
                isValid = false;
            }
        }

        // Если все проверки пройдены
        if (isValid) {
            alert('Форма успешно отправлена!');
            form.reset();
            // Сброс иконок после отправки
            document.querySelectorAll('.status-icon').forEach(icon => icon.style.display = 'none');
        }
    });
});