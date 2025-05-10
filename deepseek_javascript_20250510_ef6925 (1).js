// Названия позиций (можно менять)
const items = [
    "Пиво светлое", "Пиво темное", 
    "Вино красное", "Вино белое", 
    "Коктейли", "Закуски", 
    "Лимонад", "Кофе", 
    "Чай", "Десерты"
];

// Инициализация счетчиков
let counters = JSON.parse(localStorage.getItem('counters')) || Array(items.length).fill(0);

// Создание интерфейса
function createCounters() {
    const container = document.getElementById('counters');
    
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'counter';
        
        div.innerHTML = `
            <span style="flex-grow:1">${item}</span>
            <button onclick="decrement(${index})">-</button>
            <span id="count-${index}" style="width:40px; text-align:center">${counters[index]}</span>
            <button onclick="increment(${index})">+</button>
            <button onclick="reset(${index})" style="background:#95a5a6">Сброс</button>
        `;
        
        container.appendChild(div);
    });
}

// Обновление общего количества
function updateTotal() {
    document.getElementById('total').textContent = counters.reduce((a, b) => a + b, 0);
}

// Функции управления
function increment(index) {
    counters[index]++;
    updateCounter(index);
}

function decrement(index) {
    if (counters[index] > 0) counters[index]--;
    updateCounter(index);
}

function reset(index) {
    counters[index] = 0;
    updateCounter(index);
}

function resetAll() {
    counters = Array(items.length).fill(0);
    counters.forEach((_, i) => updateCounter(i));
}

function updateCounter(index) {
    document.getElementById(`count-${index}`).textContent = counters[index];
    localStorage.setItem('counters', JSON.stringify(counters));
    updateTotal();
}

// Инициализация при загрузке
window.onload = () => {
    createCounters();
    updateTotal();
};