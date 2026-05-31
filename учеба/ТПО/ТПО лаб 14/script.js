const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearAllBtn = document.getElementById('clear-all');

const customCategoryContainer = document.getElementById('custom-category-container');
const customCategoryInput = document.getElementById('custom-category');

dateInput.valueAsDate = new Date();

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
let currentFilter = 'all';

// Появление поля "Другое"
categoryInput.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        customCategoryContainer.style.display = 'block';
    } else {
        customCategoryContainer.style.display = 'none';
        customCategoryInput.value = ''; 
    }
});

function addTransaction(e) {
    e.preventDefault();

    let operationName = textInput.value.trim();
    const amountVal = amountInput.value.trim();
    let catValue = categoryInput.value;
    let finalCategory = catValue;

    if (amountVal === '') {
        alert('Пожалуйста, введите сумму');
        return;
    }

    // ЛОГИКА: Если выбрано "Другое"
    if (catValue === 'other') {
        const customVal = customCategoryInput.value.trim();
        finalCategory = customVal !== '' ? customVal : 'Другое'; // Необязательное поле
    }

    // ЛОГИКА: Если выбран прочерк "-"
    if (catValue === '-') {
        if (operationName === '') {
            alert('Если выбран прочерк (-), вы обязаны ввести название операции!');
            return;
        }
        finalCategory = 'Без категории';
    } else {
        // Если категория выбрана, а название пустое -> названием становится категория
        if (operationName === '') {
            operationName = finalCategory;
        }
    }

    const transaction = {
        id: generateID(),
        text: operationName,
        amount: +amountVal,
        type: typeInput.value,
        category: finalCategory,
        date: dateInput.value
    };

    transactions.push(transaction);
    
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    // Очистка формы
    textInput.value = '';
    amountInput.value = '';
    categoryInput.value = '🍔 Еда'; 
    customCategoryContainer.style.display = 'none';
    customCategoryInput.value = '';
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

function addTransactionDOM(transaction) {
    if (currentFilter !== 'all' && transaction.type !== currentFilter) {
        return;
    }

    const sign = transaction.type === 'income' ? '+' : '-';
    const item = document.createElement('li');

    item.classList.add(transaction.type);
    
    item.innerHTML = `
        <div class="item-info">
            <span class="item-text">${transaction.text}</span>
            <span class="item-meta">${transaction.category} • ${formatDate(transaction.date)}</span>
        </div>
        <div class="item-amount">${sign}${Math.abs(transaction.amount).toFixed(2)} BYN</div>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})"><i class="fa-solid fa-xmark"></i></button>
    `;

    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => 
        transaction.type === 'income' ? transaction.amount : -transaction.amount
    );

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `${total} BYN`;
    money_plus.innerText = `+${income} BYN`;
    money_minus.innerText = `-${expense} BYN`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

clearAllBtn.addEventListener('click', () => {
    if(confirm('Удалить всю историю?')) {
        transactions = [];
        updateLocalStorage();
        init();
    }
});

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        init();
    });
});

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);